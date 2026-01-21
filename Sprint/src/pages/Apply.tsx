import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ClipboardCheck, Plus, RefreshCcw, Trash2 } from "lucide-react";

type ProfileState = {
  name: string;
  age: string;
  gender: string;
  intro: string;
  school: string;
  major: string;
  year: string;
  gpa: string;
  experience: string;
  portfolio: string;
  resumeName: string;
};

type StoredProfile = ProfileState & { skills?: string[] };

const STORAGE_KEY = "sprint.mypage";

export default function Apply() {
  const reduceMotion = useReducedMotion();
  const [loadStatus, setLoadStatus] = useState<"idle" | "loaded" | "empty" | "error">("idle");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileState>({
    name: "",
    age: "",
    gender: "",
    intro: "",
    school: "",
    major: "",
    year: "",
    gpa: "",
    experience: "",
    portfolio: "",
    resumeName: "",
  });

  const updateField = (key: keyof ProfileState, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setLoadStatus("idle");
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed || skills.includes(trimmed)) {
      setNewSkill("");
      return;
    }
    setSkills((prev) => [...prev, trimmed]);
    setNewSkill("");
    setLoadStatus("idle");
  };

  const removeSkill = (value: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== value));
    setLoadStatus("idle");
  };

  const handleLoadFromMyPage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setLoadStatus("empty");
      return;
    }
    try {
      const parsed = JSON.parse(stored) as StoredProfile;
      setProfile((prev) => ({ ...prev, ...parsed }));
      if (Array.isArray(parsed.skills)) {
        setSkills(parsed.skills);
      }
      setLoadStatus("loaded");
    } catch {
      setLoadStatus("error");
    }
  };

  const resumeLabel = useMemo(
    () =>
      profile.resumeName ? `파일명: ${profile.resumeName}` : "PDF/DOCX 파일을 업로드하세요.",
    [profile.resumeName]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-ink/10 bg-white/90 p-8">
          <div className="flex items-center gap-3 text-ink">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accentStrong">
              <ClipboardCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Apply</p>
              <h1 className="mt-2 text-2xl font-semibold text-ink">지원자 신청서</h1>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            스프린트 참여에 필요한 기본 정보를 입력하세요. 마이페이지에 저장된 정보도
            바로 불러올 수 있습니다.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleLoadFromMyPage}
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-semibold text-ink/70 transition hover:border-ink/30"
            >
              <RefreshCcw className="h-4 w-4" />
              마이페이지 정보 불러오기
            </button>
            {loadStatus === "loaded" && (
              <span className="text-xs text-ink/60">마이페이지 정보가 적용되었습니다.</span>
            )}
            {loadStatus === "empty" && (
              <span className="text-xs text-ink/60">저장된 마이페이지 정보가 없습니다.</span>
            )}
            {loadStatus === "error" && (
              <span className="text-xs text-red-500">정보를 불러오지 못했습니다.</span>
            )}
          </div>

          <div className="mt-8 space-y-10">
            <Section title="기본 정보">
              <Field label="이름" value={profile.name} onChange={(v) => updateField("name", v)} />
              <Field
                label="나이"
                value={profile.age}
                onChange={(v) => updateField("age", v)}
                inputClassName="max-w-[140px]"
              />
              <Field
                label="성별"
                value={profile.gender}
                onChange={(v) => updateField("gender", v)}
                inputClassName="max-w-[220px]"
                placeholder="예) 남성/여성/비공개"
              />
              <Field
                label="한줄 소개"
                value={profile.intro}
                onChange={(v) => updateField("intro", v)}
                placeholder="예) 데이터 분석과 프로덕트에 관심이 많아요."
              />
            </Section>

            <Section title="학력 정보">
              <Field
                label="학교"
                value={profile.school}
                onChange={(v) => updateField("school", v)}
              />
              <Field
                label="전공"
                value={profile.major}
                onChange={(v) => updateField("major", v)}
              />
              <Field
                label="학년"
                value={profile.year}
                onChange={(v) => updateField("year", v)}
                inputClassName="max-w-[180px]"
              />
              <Field
                label="학점"
                value={profile.gpa}
                onChange={(v) => updateField("gpa", v)}
                inputClassName="max-w-[180px]"
                placeholder="예) 4.2 / 4.5"
              />
            </Section>

            <Section title="경력 및 역량">
              <TextArea
                label="경력 요약"
                value={profile.experience}
                onChange={(v) => updateField("experience", v)}
                placeholder="프로젝트/인턴/대외활동 경험을 정리해 주세요."
              />
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
                  보유 기술
                </label>
                <div className="flex flex-wrap gap-2">
                  {skills.length === 0 && (
                    <span className="text-xs text-ink/40">등록된 기술이 없습니다.</span>
                  )}
                  {skills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accentStrong transition hover:bg-accent/25"
                    >
                      {skill}
                      <Trash2 className="h-3 w-3" />
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <input
                    className="w-full max-w-md rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-accent/50 focus:outline-none"
                    placeholder="예) SQL, Python, Figma"
                    value={newSkill}
                    onChange={(event) => setNewSkill(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-ink/90"
                  >
                    <Plus className="h-4 w-4" />
                    추가
                  </button>
                </div>
              </div>
            </Section>

            <Section title="포트폴리오 및 이력서" className="pt-2">
              <Field
                label="포트폴리오 링크"
                value={profile.portfolio}
                onChange={(v) => updateField("portfolio", v)}
                placeholder="Notion, GitHub, Behance 등"
              />
              <FileField
                label="이력서 파일"
                value={profile.resumeName}
                helper={resumeLabel}
                onChange={(value) => updateField("resumeName", value)}
              />
            </Section>
          </div>

          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
          >
            프로필 제출하기
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
};

function Field({ label, value, onChange, placeholder, inputClassName = "" }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        {label}
      </label>
      <input
        className={`mt-2 block w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent/50 focus:outline-none ${inputClassName}`}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function TextArea({ label, value, onChange, placeholder }: TextAreaProps) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        {label}
      </label>
      <textarea
        className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent/50 focus:outline-none"
        rows={4}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function FileField({
  label,
  value,
  helper,
  onChange,
}: {
  label: string;
  value: string;
  helper: string;
  onChange: (value: string) => void;
}) {
  const inputId = "apply-resume-upload";
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        {label}
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink/70">
        <label
          htmlFor={inputId}
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold text-ink/70 transition hover:border-ink/30"
        >
          파일 선택
        </label>
        <input
          id={inputId}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(event) => onChange(event.target.files?.[0]?.name ?? "")}
        />
        <span className="text-xs text-ink/60">{helper}</span>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink/70 transition hover:border-ink/30"
          >
            <Trash2 className="h-3 w-3" />
            삭제
          </button>
        )}
      </div>
    </div>
  );
}
