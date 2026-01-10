// @ts-nocheck
import fetch from "node-fetch";

export async function screenResume({ jobDescription = "", criteria = "", resumeText = "" } = {}) {
  // Ollama 서버 URL (환경변수 또는 기본값)
  const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:8000";

  try {
    // Python FastAPI 서버 호출 (Ollama 기반)
    const res = await fetch(`${ollamaUrl}/analyze-resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        job_description: jobDescription,
        criteria: criteria,
        resume_text: resumeText,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Ollama server error: ${res.status} ${txt}`);
    }

    const body = await res.json();

    if (body.success) {
      return { success: true, data: body };
    } else {
      throw new Error(body.error || "Unknown error from Ollama server");
    }
  } catch (e) {
    console.error("Ollama screen error", e.message || e);
  }

  // Fallback simple screener: for each criteria line, check substring presence and produce simple reasoning
  const items = (criteria || "").split(/\n|,/).map((s) => s.trim()).filter(Boolean);
  const lowered = (resumeText || "").toLowerCase();
  const criteria_decisions = items.map((c) => {
    const key = c.toLowerCase();
    const matched = key.split(" ").every((tok) => lowered.includes(tok));
    const reasoning = matched ? `Found evidence for '${c}' in the resume.` : `Could not find clear evidence for '${c}'.`;
    return { criteria: c, decision: matched, reasoning };
  });

  const passed = criteria_decisions.filter((d) => d.decision).length;
  const overall_decision = items.length ? passed >= Math.ceil(items.length / 2) : false;
  const overall_reasoning = `Matched ${passed} of ${items.length} criteria${items.length ? (overall_decision ? ", recommend passing." : ", recommend rejecting.") : "."}`;

  return { success: true, data: { criteria_decisions, overall_decision, overall_reasoning } };
}
