import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowUpRight, ClipboardCheck, FileStack, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { sprints } from "../data/sprints";

export default function CompanyDashboard() {
  const reduceMotion = useReducedMotion();

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
          <StatCard title="진행 중" value="3" icon={<FileStack className="h-5 w-5" />} />
          <StatCard title="지원 팀" value="18" icon={<Users className="h-5 w-5" />} />
          <StatCard title="평가 완료" value="7" icon={<ClipboardCheck className="h-5 w-5" />} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {sprints.slice(0, 4).map((sprint) => (
            <div
              key={sprint.id}
              className="rounded-2xl border border-ink/10 bg-white/90 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-ink/40">{sprint.company}</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{sprint.title}</h3>
              <p className="mt-3 text-sm text-ink/70">{sprint.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/60">
                <span className="rounded-full border border-ink/10 px-3 py-1">
                  지원 팀 6개
                </span>
                <span className="rounded-full border border-ink/10 px-3 py-1">
                  평가 진행 중
                </span>
              </div>
              <Link
<<<<<<< HEAD
                to={`/sprints/${sprint.id}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent"
              >
                상세 보기
=======
                to={`/company/screening?sprintId=${sprint.id}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
              >
                스크리닝 센터 들어가기
>>>>>>> aee7249 (Update screening flows and UI)
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
<<<<<<< HEAD
=======

        <div className="mt-10 rounded-2xl border border-ink/10 bg-white/90 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/40">Screening Center</p>
          <h2 className="mt-2 text-lg font-semibold text-ink">스크리닝 센터란?</h2>
          <p className="mt-2 text-sm text-ink/60">
            이력서 자동 스크리닝과 코딩/직무 테스트 결과를 합산해 1차 평가와
            랭킹을 생성하는 운영 대시보드입니다.
          </p>
        </div>
>>>>>>> aee7249 (Update screening flows and UI)
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
