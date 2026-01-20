import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Filter, XCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { sprints } from "../data/sprints";
import {
  candidateScreeningSamples,
  screeningTests,
  type CandidateScreening,
} from "../data/screening";

type FilterMode = "all" | "pass" | "review" | "fail";

export default function ScreeningCenter() {
  const reduceMotion = useReducedMotion();
  const [searchParams] = useSearchParams();
  const [selectedSprintId, setSelectedSprintId] = useState(sprints[0]?.id ?? "");
  const [filter, setFilter] = useState<FilterMode>("all");

  useEffect(() => {
    const sprintId = searchParams.get("sprintId");
    if (!sprintId) return;
    const exists = sprints.some((item) => item.id === sprintId);
    if (exists) {
      setSelectedSprintId(sprintId);
    }
  }, [searchParams]);

  const selectedSprint = useMemo(
    () => sprints.find((item) => item.id === selectedSprintId) || null,
    [selectedSprintId]
  );

  const allResults = useMemo(() => {
    const coding = screeningTests.find((test) => test.category === "coding");
    const domain = screeningTests.find((test) => test.category === "domain");
    const data = candidateScreeningSamples
      .filter((item) => item.sprintId === selectedSprintId)
      .map((item) => {
        const totalScore = Math.round(
          item.resumeScore * 0.5 + item.codingTestScore * 0.3 + item.domainTestScore * 0.2
        );
        const codingPass = !coding || item.codingTestScore >= coding.passScore;
        const domainPass = !domain || item.domainTestScore >= domain.passScore;
        const resumePass = item.resumeScore >= 70;

        let decision: FilterMode = "review";
        if (resumePass && codingPass && domainPass) {
          decision = "pass";
        } else if (totalScore < 65 || (!codingPass && !domainPass)) {
          decision = "fail";
        }

        return {
          ...item,
          totalScore,
          decision,
          codingPass,
          domainPass,
          resumePass,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((item, index) => ({ ...item, rank: index + 1 }));

    return data;
  }, [selectedSprintId]);

  const results = useMemo(() => {
    if (filter === "all") return allResults;
    return allResults.filter((item) => item.decision === filter);
  }, [allResults, filter]);

  const summary = useMemo(() => {
    const all = allResults.length;
    const pass = allResults.filter((item) => item.decision === "pass").length;
    const review = allResults.filter((item) => item.decision === "review").length;
    const fail = allResults.filter((item) => item.decision === "fail").length;
    return { all, pass, review, fail };
  }, [allResults]);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Screening Center</p>
            <h1 className="mt-3 text-2xl font-semibold text-ink">
              1차 스크리닝 운영 대시보드
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-ink/60">
              이력서 자동 스크리닝 + 테스트(코딩/직무) 결과를 합산해 후보자를 랭킹합니다.
            </p>
          </div>
          <Link
            to="/resume-screener"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
          >
            Resume Screening 실행
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-ink/40">Screening Template</p>
                <h2 className="mt-2 text-lg font-semibold text-ink">테스트 세트</h2>
                <p className="mt-2 text-sm text-ink/60">
                  코딩 테스트와 직무 테스트를 함께 운영합니다.
                </p>
              </div>
              <span className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/50">
                총 2개 테스트
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              {screeningTests.map((test) => (
                <div
                  key={test.id}
                  className="rounded-2xl border border-ink/10 bg-white px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-ink">{test.title}</h3>
                      <p className="mt-2 text-sm text-ink/60">{test.description}</p>
                    </div>
                    <span className="rounded-full bg-ink/5 px-3 py-1 text-xs text-ink/60">
                      합격 {test.passScore}/{test.maxScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/40">Sprint</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">스프린트 선택</h2>
            <select
              value={selectedSprintId}
              onChange={(event) => setSelectedSprintId(event.target.value)}
              className="mt-4 w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm"
            >
              {sprints.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} · {item.company}
                </option>
              ))}
            </select>
            <div className="mt-5 rounded-2xl border border-ink/10 bg-mist/50 px-4 py-4 text-sm text-ink/70">
              {selectedSprint ? (
                <>
                  <p className="font-semibold text-ink">{selectedSprint.title}</p>
                  <p className="mt-2 text-sm text-ink/60">{selectedSprint.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink/50">
                    {selectedSprint.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-ink/10 px-3 py-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p>스프린트를 선택하세요.</p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/40">Ranking</p>
              <h2 className="mt-2 text-lg font-semibold text-ink">지원자 점수 & 랭킹</h2>
              <p className="mt-1 text-sm text-ink/60">
                Resume 점수(50%) + 코딩(30%) + 직무(20%) 합산 기준입니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink/50">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-3 py-1">
                <Filter className="h-3.5 w-3.5" /> 필터
              </span>
              {(["all", "pass", "review", "fail"] as FilterMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFilter(mode)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    filter === mode
                      ? "bg-ink text-white"
                      : "border border-ink/10 text-ink/60 hover:border-ink/30"
                  }`}
                >
                  {mode === "all" && `전체 (${summary.all})`}
                  {mode === "pass" && `PASS (${summary.pass})`}
                  {mode === "review" && `REVIEW (${summary.review})`}
                  {mode === "fail" && `FAIL (${summary.fail})`}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {results.length === 0 && (
              <p className="rounded-2xl border border-dashed border-ink/15 bg-mist/40 px-4 py-6 text-sm text-ink/60">
                선택한 스프린트에 대한 테스트 결과가 없습니다.
              </p>
            )}
            {results.map((item) => (
              <ResultRow key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

type ResultItem = CandidateScreening & {
  totalScore: number;
  decision: FilterMode;
  codingPass: boolean;
  domainPass: boolean;
  resumePass: boolean;
  rank: number;
};

function ResultRow({ item }: { item: ResultItem }) {
  const decisionLabel =
    item.decision === "pass" ? "PASS" : item.decision === "fail" ? "FAIL" : "REVIEW";
  const decisionStyle =
    item.decision === "pass"
      ? "bg-emerald-100 text-emerald-700"
      : item.decision === "fail"
      ? "bg-rose-100 text-rose-700"
      : "bg-amber-100 text-amber-700";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white px-5 py-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-ink">#{item.rank}</span>
          <p className="text-base font-semibold text-ink">{item.name}</p>
          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${decisionStyle}`}>
            {decisionLabel}
          </span>
        </div>
        <p className="mt-2 text-xs text-ink/50">제출일 {item.submittedAt}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-ink/60">
        <ScorePill label="Resume" score={item.resumeScore} passed={item.resumePass} />
        <ScorePill label="Coding" score={item.codingTestScore} passed={item.codingPass} />
        <ScorePill label="Domain" score={item.domainTestScore} passed={item.domainPass} />
        <div className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink">
          Total {item.totalScore}
        </div>
      </div>
    </div>
  );
}

function ScorePill({ label, score, passed }: { label: string; score: number; passed: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
        passed
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
    >
      {passed ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
      {label} {score}
    </span>
  );
}