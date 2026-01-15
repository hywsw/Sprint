import { motion, useReducedMotion } from "framer-motion";

export default function Community() {
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
          <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Community</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">커뮤니티</h1>
          <p className="mt-2 text-sm text-ink/60">커뮤니티 기능은 준비 중입니다.</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              className="inline-flex items-center justify-center rounded-full border border-ink/10 px-4 py-2 font-semibold text-ink/70 transition hover:border-ink/30"
              href="/sprints"
            >
              스프린트 둘러보기
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
              href="/home"
            >
              메인으로 이동
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
