import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Save, Trash2 } from "lucide-react";

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

export default function MyPage() {
  const reduceMotion = useReducedMotion();
  const [saved, setSaved] = useState(false);
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

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as StoredProfile;
      setProfile((prev) => ({ ...prev, ...parsed }));
      if (Array.isArray(parsed.skills)) {
        setSkills(parsed.skills);
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  const updateField = (key: keyof ProfileState, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed || skills.includes(trimmed)) {
      setNewSkill("");
      return;
    }
    setSkills((prev) => [...prev, trimmed]);
    setNewSkill("");
    setSaved(false);
  };

  const removeSkill = (value: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== value));
    setSaved(false);
  };

  const handleSave = () => {
    const payload: StoredProfile = { ...profile, skills };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSaved(true);
  };

  const resumeLabel = useMemo(
    () =>
      profile.resumeName ? `파일명: ${profile.resumeName}` : "PDF/DOCX 파일 업로드",
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
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-ink/10 bg-white/90 p-8 shadow-[0_25px_70px_-55px_rgba(10,15,31,0.5)]">
          <p className="text-xs uppercase tracking-[0.4em] text-ink/40">My Page</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">마이페이지</h1>
          <p className="mt-2 text-sm text-ink/60">내 정보와 지원 현황을 관리하세요.</p>

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
                placeholder="예: 여성/남성/무관"
              />
              <Field
                label="한 줄 소개"
                value={profile.intro}
                onChange={(v) => updateField("intro", v)}
                placeholder="예: 데이터 분석과 디자인에 관심이 많아요"
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
                placeholder="예: 4.2 / 4.5"
              />
            </Section>

            <Section title="경력 및 역량">
              <TextArea
                label="경력 요약"
                value={profile.experience}
                onChange={(v) => updateField("experience", v)}
                placeholder="프로젝트/인턴/대외활동 등 경험을 정리해 주세요"
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
                    placeholder="예: SQL, Python, Figma"
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
            >
              <Save className="h-4 w-4" />
              저장하기
            </button>
            {saved && <span className="text-xs text-ink/60">저장되었습니다.</span>}
          </div>
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
  const inputId = "resume-upload";
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
