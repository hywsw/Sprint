import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";

export default function Apply() {
  const reduceMotion = useReducedMotion();

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
              <h1 className="mt-2 text-2xl font-semibold text-ink">지원자 온보딩</h1>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            팀 스프린트 참여를 위한 기본 정보를 입력해주세요.
          </p>

          <div className="mt-8 grid gap-5">
            <Field label="이름" placeholder="홍길동" />
            <Field label="이메일" placeholder="you@email.com" />
            <Field label="주요 관심 분야" placeholder="Operations, Data, Growth 등" />
            <Field label="보유 스킬" placeholder="예: SQL, Python, Figma" />
            <Field label="포트폴리오 링크" placeholder="Notion, GitHub, Behance 등" />
            <Field label="간단 소개" placeholder="스프린트에서 하고 싶은 일" multiline />
          </div>

          <button
            type="button"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
          >
            프로필 저장하기
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  multiline?: boolean;
};

function Field({ label, placeholder, multiline = false }: FieldProps) {
  const baseClass =
    "mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent/50 focus:outline-none";

  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        {label}
      </label>
      {multiline ? (
        <textarea className={baseClass} rows={4} placeholder={placeholder} />
      ) : (
        <input className={baseClass} placeholder={placeholder} />
      )}
    </div>
  );
}
