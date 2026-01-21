import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Filter } from "lucide-react";
import SprintCard from "../components/SprintCard";
import Section from "../components/Section";
import { useSprints } from "../data/sprintStore";

const durationOptions = ["7일", "10일", "2주"];
const categoryOptions = ["Operations", "Data", "Growth", "Prototype", "Process"];
const skillOptions = ["Python", "SQL", "UX", "Automation", "Research"];
const rewardOptions = ["인턴십 인터뷰 패스트트랙", "유급 인턴십 제안", "인턴십 우선 고려"];

export default function Sprints() {
  const reduceMotion = useReducedMotion();
  const [searchParams] = useSearchParams();
  const selectMode = searchParams.get("selectFor") === "resume";
  const sprints = useSprints();
  const [duration, setDuration] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [skill, setSkill] = useState<string | null>(null);
  const [reward, setReward] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return sprints.filter((sprint) => {
      if (duration && sprint.duration !== duration) return false;
      if (category && !sprint.tags.includes(category)) return false;
      if (skill && !sprint.skills.includes(skill)) return false;
      if (reward && sprint.reward !== reward) return false;
      return true;
    });
  }, [duration, category, skill, reward, sprints]);

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <Section
        eyebrow="Browse"
        title="스프린트 탐색"
        subtitle="필터로 목표에 맞는 스프린트를 찾아보세요."
      >
        {selectMode && (
          <p className="mb-4 text-sm text-ink/60">
            현재 등록된 스프린트
          </p>
        )}
        <div className="grid gap-6 lg:grid-cols-[1fr_3fr]">
          <div className="rounded-2xl border border-ink/10 bg-white/90 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Filter className="h-4 w-4 text-accent" />
              Filters
            </div>
            <div className="mt-5 space-y-5 text-sm">
              <FilterGroup
                label="기간"
                options={durationOptions}
                value={duration}
                onChange={setDuration}
              />
              <FilterGroup
                label="카테고리"
                options={categoryOptions}
                value={category}
                onChange={setCategory}
              />
              <FilterGroup
                label="스킬"
                options={skillOptions}
                value={skill}
                onChange={setSkill}
              />
              <FilterGroup
                label="보상"
                options={rewardOptions}
                value={reward}
                onChange={setReward}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((sprint) => (
              <Link
                key={sprint.id}
                to={
                  selectMode
                    ? `/resume-screener?sprintId=${sprint.id}`
                    : `/sprints/${sprint.id}`
                }
                className="block"
              >
                <SprintCard sprint={sprint} />
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-ink/10 bg-white/90 p-6 text-sm text-ink/70">
                선택한 조건에 맞는 스프린트가 없습니다.
              </div>
            )}
          </div>
        </div>
      </Section>
    </motion.div>
  );
}

type FilterGroupProps = {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
};

function FilterGroup({ label, options, value, onChange }: FilterGroupProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(value === option ? null : option)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              value === option
                ? "bg-accent/20 text-accentStrong"
                : "border border-ink/10 text-ink/70 hover:border-ink/30"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
