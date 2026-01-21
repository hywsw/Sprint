import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSprintMeta, saveSprint, setSprintStatus, updateSprint, useSprints } from "../data/sprintStore";

const steps = [
  {
    title: "과제 정의",
    description: "해결하고 싶은 업무와 산출물을 정의합니다.",
  },
  {
    title: "평가 기준",
    description: "루브릭과 팀 구성 기준을 설정합니다.",
  },
  {
    title: "스프린트 설정",
    description: "기간, 보상, 일정 공유 방식을 정합니다.",
  },
];

export default function CompanyCreate() {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { auth } = useAuth();
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const sprints = useSprints();
  const editId = searchParams.get("edit");
  const editingSprint = useMemo(
    () => (editId ? sprints.find((item) => item.id === editId) || null : null),
    [editId, sprints]
  );
  const [form, setForm] = useState({
    title: "",
    background: "",
    deliverable: "",
    rubric: "",
    team: "",
    checkpoints: "",
    duration: "",
    reward: "",
    schedule: "",
    status: "active" as "active" | "review" | "done" | "closed",
  });

  const setField =
    (key: keyof typeof form) => (value: string) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  const parseList = (value: string) =>
    value
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);

  useEffect(() => {
    if (!editingSprint) return;
    const meta = getSprintMeta(editingSprint);
    setForm({
      title: editingSprint.title,
      background: editingSprint.summary,
      deliverable: editingSprint.deliverable,
      rubric: editingSprint.criteria.join(", "),
      team: editingSprint.skills.join(", "),
      checkpoints: editingSprint.note,
      duration: editingSprint.duration,
      reward: editingSprint.reward,
      schedule: editingSprint.note,
      status: meta.status,
    });
  }, [editingSprint]);

  const handleNext = () => {
    const isLast = current === steps.length - 1;
    if (!isLast) {
      setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }

    setError(null);
    if (!form.title.trim()) {
      setError("스프린트 제목을 입력해 주세요.");
      return;
    }
    if (!form.deliverable.trim()) {
      setError("결과물을 입력해 주세요.");
      return;
    }
    if (!form.duration.trim()) {
      setError("기간을 입력해 주세요.");
      return;
    }

    const criteria =
      parseList(form.rubric).length > 0
        ? parseList(form.rubric)
        : ["Execution", "Collaboration"];
    const skills =
      parseList(form.team).length > 0
        ? parseList(form.team)
        : ["Teamwork", "Execution"];

    const payload = {
      id:
        editingSprint?.id ??
        `${form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "sprint"}-${Date.now()}`,
      title: form.title.trim(),
      company: auth.name || "Company",
      duration: form.duration.trim(),
      deliverable: form.deliverable.trim(),
      skills,
      reward: form.reward.trim() || "TBD",
      tags: editingSprint?.tags ?? ["Operations"],
      summary: form.background.trim() || form.title.trim(),
      note: form.schedule.trim() || form.checkpoints.trim() || "TBD",
      jobDescription:
        form.background.trim() ||
        `${form.title.trim()} - ${form.deliverable.trim()}`,
      criteria,
      sample: false,
    };

    if (editingSprint) {
      updateSprint(payload);
      setSprintStatus(payload.id, form.status);
    } else {
      saveSprint(payload);
    }

    navigate("/company");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-ink/10 bg-white/90 p-8 shadow-[0_25px_70px_-55px_rgba(10,15,31,0.5)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Create Sprint</p>
              <h1 className="mt-3 text-2xl font-semibold text-ink">
                {editingSprint ? "스프린트 수정" : "스프린트 만들기"}
              </h1>
              <p className="mt-2 text-sm text-ink/60">
                {editingSprint
                  ? "등록된 스프린트를 수정합니다."
                  : "실제 과제 기반으로 스프린트를 설계합니다."}
              </p>
            </div>
            <div className="text-sm text-ink/60">
              Step {current + 1} / {steps.length}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`rounded-xl border px-4 py-3 text-sm ${
                  index === current
                    ? "border-accent/60 bg-accent/10 text-ink"
                    : "border-ink/10 text-ink/60"
                }`}
              >
                <p className="font-semibold">{step.title}</p>
                <p className="mt-2 text-xs">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {current === 0 && (
              <>
                <Field
                  label="과제 제목"
                  placeholder="예: 고객 리포트 자동화 설계"
                  value={form.title}
                  onChange={setField("title")}
                />
                <Field
                  label="과제 배경"
                  placeholder="현재 운영에서 발생하는 병목을 적어주세요."
                  value={form.background}
                  onChange={setField("background")}
                />
                <Field
                  label="산출물"
                  placeholder="예: 자동화 스크립트 + 대시보드"
                  value={form.deliverable}
                  onChange={setField("deliverable")}
                />
              </>
            )}
            {current === 1 && (
              <>
                <Field
                  label="루브릭 기준"
                  placeholder="실행 속도, 협업, 완성도 등"
                  value={form.rubric}
                  onChange={setField("rubric")}
                />
                <Field
                  label="팀 구성 기준"
                  placeholder="교차 전공 팀, 3~5명"
                  value={form.team}
                  onChange={setField("team")}
                />
                <Field
                  label="체크포인트"
                  placeholder="중간 리뷰 일정 및 피드백 방식"
                  value={form.checkpoints}
                  onChange={setField("checkpoints")}
                />
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                    진행 상황
                  </label>
                  <select
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink focus:border-accent/50 focus:outline-none"
                    value={form.status}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        status: event.target.value as "active" | "review" | "done" | "closed",
                      }))
                    }
                  >
                    <option value="active">진행 중</option>
                    <option value="review">평가 진행 중</option>
                    <option value="done">평가 완료</option>
                    <option value="closed">종료</option>
                  </select>
                </div>
              </>
            )}
            {current === 2 && (
              <>
                <Field
                  label="기간"
                  placeholder="예: 7일, 10일, 2주"
                  value={form.duration}
                  onChange={setField("duration")}
                />
                <Field
                  label="보상"
                  placeholder="인턴십 인터뷰, 유급 인턴십 등"
                  value={form.reward}
                  onChange={setField("reward")}
                />
                <Field
                  label="데모 데이 일정"
                  placeholder="마지막 날 발표 방식"
                  value={form.schedule}
                  onChange={setField("schedule")}
                />
              </>
            )}
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60"
              onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
              disabled={current === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              이전
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
              onClick={handleNext}
            >
              {current === steps.length - 1 ? "저장하기" : "다음"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function Field({ label, placeholder, value, onChange }: FieldProps) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        {label}
      </label>
      <input
        className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent/50 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
