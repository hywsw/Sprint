import { motion, useReducedMotion } from "framer-motion";

export default function ResumeScreener() {
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
          <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Resume Screening</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">Resume Screening</h1>
          <p className="mt-2 text-sm text-ink/60">이 기능은 추후 제공 예정입니다.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              className="inline-flex items-center justify-center rounded-full border border-ink/10 px-4 py-2 font-semibold text-ink/70 transition hover:border-ink/30"
              href="/apply"
            >
              지원자 프로필 작성
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
              href="/company/create"
            >
              스프린트 만들기
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
