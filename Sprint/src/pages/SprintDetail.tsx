import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, ClipboardList, Sparkles, Users } from "lucide-react";
import RubricGrid from "../components/RubricGrid";
import { sprints } from "../data/sprints";

export default function SprintDetail() {
  const reduceMotion = useReducedMotion();
  const { id } = useParams();
  const sprint = useMemo(() => sprints.find((item) => item.id === id), [id]);

  if (!sprint) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm text-ink/70">해당 스프린트를 찾을 수 없습니다.</p>
        <Link className="mt-4 inline-flex text-sm font-semibold text-accent" to="/sprints">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <section className="bg-night py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate">
            <Sparkles className="h-4 w-4 text-accent" />
            Sprint Detail
          </div>
          <h1 className="text-3xl font-semibold md:text-4xl">{sprint.title}</h1>
          <p className="text-sm text-slate">{sprint.company}</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1">
              <CalendarDays className="h-4 w-4 text-accent" />
              {sprint.duration}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1">
              <ClipboardList className="h-4 w-4 text-accent" />
              {sprint.deliverable}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1">
              <Users className="h-4 w-4 text-accent" />
              팀 기반 참여
            </span>
          </div>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            스프린트 지원하기
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
            <h2 className="text-lg font-semibold text-ink">과제 설명</h2>
            <p className="mt-3 text-sm text-ink/70">{sprint.summary}</p>
            <p className="mt-4 text-sm text-ink/70">
              결과물은 실무에 바로 적용 가능한 형태를 목표로 합니다.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
            <h2 className="text-lg font-semibold text-ink">필요 역량</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {sprint.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-ink/10 px-3 py-1 text-ink/70"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
            <h2 className="text-lg font-semibold text-ink">타임라인</h2>
            <div className="mt-4 grid gap-3 text-sm text-ink/70">
              <div className="rounded-xl border border-ink/10 bg-ink/5 p-3">
                Day 1-2: 팀 구성 및 문제 정의
              </div>
              <div className="rounded-xl border border-ink/10 bg-ink/5 p-3">
                Day 3-5: 솔루션 설계 및 실행
              </div>
              <div className="rounded-xl border border-ink/10 bg-ink/5 p-3">
                Day 6-7: 결과물 정리 및 데모 준비
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
            <h2 className="text-lg font-semibold text-ink">보상</h2>
            <p className="mt-3 text-sm text-ink/70">{sprint.reward}</p>
            <p className="mt-4 text-xs text-ink/50">{sprint.note}</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white/90 p-6">
            <h2 className="text-lg font-semibold text-ink">평가 루브릭</h2>
            <div className="mt-4">
              <RubricGrid
                items={[
                  "Execution Speed",
                  "Clarity of Thinking",
                  "Collaboration",
                  "Deliverable Quality",
                  "Practicality",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
