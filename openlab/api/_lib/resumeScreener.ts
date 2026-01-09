// @ts-nocheck
import fetch from "node-fetch";

export async function screenResume({ jobDescription = "", criteria = "", resumeText = "" } = {}) {
  const combined = `Job Description:\n${jobDescription}\n\nCriteria:\n${criteria}\n\nResume Text:\n${resumeText}`;
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const prompt = `You are an expert resume screener. Given the job description, a numbered list of screening criteria, and the resume text, produce a JSON object with the following structure (JSON only): {
  "criteria_decisions": [{ "criteria": string, "decision": boolean, "reasoning": string }],
  "overall_decision": boolean,
  "overall_reasoning": string
}

For each criteria item provide a short reasoning (1-2 sentences) and a boolean decision whether the resume meets that criteria. Make the overall_decision true only if the majority of criteria are met (or provide a reason otherwise).`;

      const messages = [
        { role: "system", content: "You evaluate resumes against criteria and job descriptions and return concise JSON responses." },
        { role: "user", content: `${prompt}\n\n${combined}` },
      ];

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: "gpt-4o-mini", messages, max_tokens: 1400, temperature: 0 }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`OpenAI error: ${res.status} ${txt}`);
      }

      const body = await res.json();
      const content = body?.choices?.[0]?.message?.content ?? "";

      const first = content.indexOf("{");
      const last = content.lastIndexOf("}");
      if (first !== -1 && last !== -1 && last > first) {
        const jsonText = content.slice(first, last + 1);
        try {
          const parsed = JSON.parse(jsonText);
          return { success: true, data: parsed };
        } catch (e) {
          console.error("parse error", e);
        }
      }
    } catch (e) {
      console.error("OpenAI screen error", e.message || e);
    }
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
