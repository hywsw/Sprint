import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

export default function Signup() {
  const reduceMotion = useReducedMotion();
  const [role, setRole] = useState<"candidate" | "company">("candidate");

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
      transition={{ duration: reduceMotion ? 0 : 0.4 }}
      className="bg-mist"
    >
      <div className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-ink/10 bg-white/90 p-8">
          <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Signup</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">회원가입</h1>
          <p className="mt-2 text-sm text-ink/60">스프린트 참여를 위한 계정을 만듭니다.</p>

          <div className="mt-6 inline-flex rounded-full border border-ink/10 bg-white p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole("candidate")}
              className={`rounded-full px-4 py-2 transition ${
                role === "candidate" ? "bg-accent/20 text-accentStrong" : "text-ink/50"
              }`}
            >
              지원자
            </button>
            <button
              type="button"
              onClick={() => setRole("company")}
              className={`rounded-full px-4 py-2 transition ${
                role === "company" ? "bg-accent/20 text-accentStrong" : "text-ink/50"
              }`}
            >
              기업
            </button>
          </div>

          <div className="mt-8 grid gap-4">
            <Field label="이름" placeholder="홍길동" />
            {role === "company" && (
              <Field label="기업명" placeholder="예: Sprint Labs" />
            )}
            <IdField />
            <Field label="이메일" placeholder="you@email.com" type="email" />
            <Field label="비밀번호" placeholder="비밀번호 입력" type="password" />
            <Field label="비밀번호 확인" placeholder="비밀번호 재입력" type="password" />
          </div>

          <button
            type="button"
            className="mt-8 w-full rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
          >
            회원가입
          </button>

          <p className="mt-6 text-center text-sm text-ink/60">
            이미 계정이 있나요?{" "}
            <Link className="font-semibold text-accent" to="/login">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type FieldProps = {
  label: string;
  placeholder: string;
  type?: string;
};

function Field({ label, placeholder, type = "text" }: FieldProps) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        {label}
      </label>
      <input
        className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent/50 focus:outline-none"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

function IdField() {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        아이디
      </label>
      <div className="mt-2 flex gap-2">
        <input
          className="w-full flex-1 rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent/50 focus:outline-none"
          placeholder="아이디 입력"
        />
        <button
          type="button"
          className="whitespace-nowrap rounded-xl border border-ink/10 px-4 py-3 text-xs font-semibold text-ink/70 transition hover:border-ink/30"
        >
          중복체크
        </button>
      </div>
    </div>
  );
}
