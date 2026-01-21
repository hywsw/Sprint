import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { sprints } from "../data/sprints";

type CriteriaDecision = {
  criteria: string;
  decision: boolean;
  reasoning: string;
};

type ScreenerResult = {
  overall_decision?: boolean;
  overall_reasoning?: string;
  criteria_decisions?: CriteriaDecision[];
  extracted_text?: string;
};

const API_BASE =
  (import.meta as any).env?.VITE_RESUME_SCREENER_URL || "http://localhost:8000";
const actionPillBase =
  "inline-flex items-center justify-center rounded-full bg-ink font-semibold text-white shadow-glow transition hover:-translate-y-0.5";
const actionPillSm = "px-4 py-1.5 text-sm";
const actionPillFile = "px-3 py-1.5 text-xs uppercase tracking-[0.15em]";

export default function ResumeScreener() {
  const reduceMotion = useReducedMotion();
  const [searchParams] = useSearchParams();
  const [selectedSprintId, setSelectedSprintId] = useState(
    sprints[0]?.id ?? ""
  );
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [result, setResult] = useState<ScreenerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedSprint = useMemo(
    () => sprints.find((item) => item.id === selectedSprintId) || null,
    [selectedSprintId]
  );

  useEffect(() => {
    const sprintId = searchParams.get("sprintId");
    if (!sprintId) return;
    const exists = sprints.some((item) => item.id === sprintId);
    if (exists) {
      setSelectedSprintId(sprintId);
    }
  }, [searchParams]);
  const jobDescription = selectedSprint?.jobDescription || "";
  const criteriaText = selectedSprint?.criteria?.join("\n") || "";

  const verdict = useMemo(() => {
    if (!result) return null;
    if (result.overall_decision === true) return "PASS";
    if (result.overall_decision === false) return "REJECT";
    return "REVIEW";
  }, [result]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!resumeFile && !resumeText.trim()) {
      setError("PDF 업로드 또는 텍스트 입력이 필요합니다.");
      return;
    }

    if (!selectedSprint) {
      setError("스크리닝할 공고를 선택해주세요.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("job_description", jobDescription.trim());
      form.append("criteria", criteriaText.trim());
      if (resumeText.trim()) {
        form.append("resume_text", resumeText.trim());
      }
      if (resumeFile) {
        form.append("resume", resumeFile);
      }

      const resp = await fetch(`${API_BASE}/analyze-resume`, {
        method: "POST",
        body: form,
      });
      const data = await resp.json();
      if (!resp.ok || data?.success === false) {
        throw new Error(data?.error || "분석 요청에 실패했습니다.");
      }

      const payload = data?.data || data;
      setResult(payload);
    } catch (err: any) {
      setError(err?.message || "분석 중 오류가 발생했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-ink/10 bg-white/90 p-8 shadow-soft">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Resume Screening</p>
              <h1 className="mt-3 text-2xl font-semibold text-ink">이력서 자동 스크리닝</h1>
              <p className="mt-2 max-w-2xl text-sm text-ink/60">
                PDF 이력서를 업로드하면 AI 모델이 적합도를 판정하고 핵심 근거를 보여줍니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink/50">
              <span className="rounded-full border border-ink/10 px-3 py-1">FastAPI</span>
              <span className="rounded-full border border-ink/10 px-3 py-1">Ollama</span>
              <span className="rounded-full border border-ink/10 px-3 py-1">PDF Parsing</span>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                  Hiring Sprint
                </label>
                <select
                  value={selectedSprintId}
                  onChange={(event) => setSelectedSprintId(event.target.value)}
                  className="mt-3 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm focus:border-ink/40 focus:outline-none"
                >
                  {sprints.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title} · {item.company}
                    </option>
                  ))}
                </select>
                <Link
                  className={`mt-3 ${actionPillBase} ${actionPillSm}`}
                  to="/sprints?selectFor=resume"
                >
                  스프린트 찾기
                </Link>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                  Job Description
                </label>
                <div className="mt-3 min-h-[160px] w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink/70 shadow-sm">
                  {jobDescription || "선택한 공고의 JD가 없습니다."}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                  Criteria
                </label>
                <div className="mt-3 min-h-[160px] w-full whitespace-pre-line rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink/70 shadow-sm">
                  {criteriaText || "선택한 공고의 평가 기준이 없습니다."}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                  Resume PDF
                </label>
                <div className="mt-3 rounded-2xl border border-dashed border-ink/20 bg-white px-4 py-6 text-sm text-ink/60">
                  {resumeFile && (
                    <p className="mb-3 text-xs text-ink/50">{resumeFile.name}</p>
                  )}
                  <label
                    htmlFor="resume-file"
                    className={`${actionPillBase} ${actionPillFile} cursor-pointer`}
                  >
                    파일 선택
                  </label>
                  <input
                    id="resume-file"
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => setResumeFile(event.target.files?.[0] || null)}
                    className="sr-only"
                  />
                  <p className="mt-2 text-xs text-ink/40">
                    PDF 파일이 없다면 아래에 텍스트를 붙여넣어도 됩니다.
                  </p>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                  Resume Text (Optional)
                </label>
                <textarea
                  value={resumeText}
                  onChange={(event) => setResumeText(event.target.value)}
                  className="mt-3 min-h-[140px] w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm focus:border-ink/40 focus:outline-none"
                  placeholder="PDF가 없을 경우 텍스트를 붙여넣으세요."
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "분석 중..." : "적합도 분석 실행"}
              </button>
            </form>

            <div className="rounded-3xl border border-ink/10 bg-white px-6 py-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-ink">스크리닝 결과</h2>
                {verdict && (
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      verdict === "PASS"
                        ? "bg-emerald-100 text-emerald-700"
                        : verdict === "REJECT"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {verdict}
                  </span>
                )}
              </div>

              {!result && (
                <p className="mt-4 text-sm text-ink/50">
                  분석 결과가 여기 표시됩니다. 좌측 입력값을 채워 실행하세요.
                </p>
              )}

              {result && (
                <div className="mt-4 space-y-5 text-sm text-ink/70">
                  <div className="rounded-2xl border border-ink/10 bg-mist/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                      Overall Reasoning
                    </p>
                    <p className="mt-2 text-sm text-ink/70">
                      {result.overall_reasoning || "분석 요약이 없습니다."}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                      Criteria Decisions
                    </p>
                    <div className="mt-3 space-y-3">
                      {result.criteria_decisions?.length ? (
                        result.criteria_decisions.map((item, index) => (
                          <div
                            key={`${item.criteria}-${index}`}
                            className="rounded-2xl border border-ink/10 bg-white px-4 py-3"
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-ink">{item.criteria}</p>
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                  item.decision
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-rose-100 text-rose-700"
                                }`}
                              >
                                {item.decision ? "충족" : "미흡"}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-ink/60">{item.reasoning}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-ink/50">표시할 기준 평가가 없습니다.</p>
                      )}
                    </div>
                  </div>

                  {result.extracted_text && (
                    <details className="rounded-2xl border border-ink/10 bg-mist/40 px-4 py-3">
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                        Parsed Resume Text
                      </summary>
                      <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap text-xs text-ink/70">
                        {result.extracted_text}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm">
            <a
              className="inline-flex items-center justify-center rounded-full border border-ink/10 px-4 py-2 font-semibold text-ink/70 transition hover:border-ink/30"
              href="/apply"
            >
              지원자 온보딩으로 이동
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
              href="/company/create"
            >
              Hiring Sprint 만들기
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
