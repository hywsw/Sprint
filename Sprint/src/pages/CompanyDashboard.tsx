import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ClipboardCheck, FileStack, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { SprintStatus } from "../data/sprintStore";
import { getSprintMeta, useSprints } from "../data/sprintStore";

export default function CompanyDashboard() {
  const reduceMotion = useReducedMotion();
  const { auth } = useAuth();
  const sprints = useSprints();
  const pageSize = 6;
  const sortedSprints = useMemo(
    () =>
      [...sprints].sort(
        (a, b) => getSprintMeta(b).createdAt - getSprintMeta(a).createdAt
      ),
    [sprints]
  );
  const totalPages = Math.max(1, Math.ceil(sortedSprints.length / pageSize));
  const [page, setPage] = useState(1);
  const pageSprints = useMemo(
    () => sortedSprints.slice((page - 1) * pageSize, page * pageSize),
    [page, pageSize, sortedSprints]
  );
  const metaList = sprints.map((sprint) => getSprintMeta(sprint));
  const inProgressCount = metaList.filter((meta) => meta.status !== "closed").length;
  const doneCount = metaList.filter((meta) => meta.status === "closed").length;
  const applicantTeams = metaList.reduce((sum, meta) => sum + meta.applicantTeams, 0);

  const statusLabel = (status: SprintStatus) => {
    if (status === "done") return "평가 완료";
    if (status === "closed") return "종료";
    if (status === "review") return "평가 진행 중";
    return "진행 중";
  };

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Company</p>
            <h1 className="mt-3 text-2xl font-semibold text-ink">기업 대시보드</h1>
            <p className="mt-2 text-sm text-ink/60">
              진행 중인 스프린트와 지원 현황을 확인합니다.
            </p>
          </div>
          <Link
            to="/company/create"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
          >
            새 스프린트 만들기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <StatCard title="진행 중" value={`${inProgressCount}`} icon={<FileStack className="h-5 w-5" />} />
          <StatCard title="지원 팀" value={`${applicantTeams}`} icon={<Users className="h-5 w-5" />} />
          <StatCard title="종료" value={`${doneCount}`} icon={<ClipboardCheck className="h-5 w-5" />} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {pageSprints.map((sprint) => {
            const meta = getSprintMeta(sprint);
            return (
              <div
                key={sprint.id}
                className="rounded-2xl border border-ink/10 bg-white/90 p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-ink/40">{sprint.company}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{sprint.title}</h3>
                <p className="mt-3 text-sm text-ink/70">{sprint.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/60">
                  <span className="rounded-full border border-ink/10 px-3 py-1">
                    지원 팀 {meta.applicantTeams}개
                  </span>
                  <span className="rounded-full border border-ink/10 px-3 py-1">
                    {statusLabel(meta.status)}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/sprints/${sprint.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
                  >
                    상세 보기
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/company/create?edit=${sprint.id}`}
                    className="rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold text-ink/70"
                  >
                    수정
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/60">
          <span>
            {page} / {totalPages} 페이지
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold text-ink/70 disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              이전
            </button>
            <button
              type="button"
              className="rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold text-ink/70 disabled:opacity-50"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              다음
            </button>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-ink/10 bg-white/90 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/40">Screening Center</p>
          <h2 className="mt-2 text-lg font-semibold text-ink">스크리닝 센터란?</h2>
          <p className="mt-2 text-sm text-ink/60">
            이력서 자동 스크리닝과 코딩/직무 테스트 결과를 합산해 1차 평가와
            랭킹을 생성하는 운영 대시보드입니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
};

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
      <div className="flex items-center gap-3 text-ink">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accentStrong">
          {icon}
        </span>
        <p className="text-sm font-semibold text-ink">{title}</p>
      </div>
      <p className="mt-4 text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}
