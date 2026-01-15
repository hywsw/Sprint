import { motion, useReducedMotion } from "framer-motion";

export default function Privacy() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-ink">Privacy</h1>
        <p className="mt-4 text-sm text-ink/70">개인정보 처리방침은 준비 중입니다.</p>
      </div>
    </motion.div>
  );
}
