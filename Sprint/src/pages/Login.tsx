import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const reduceMotion = useReducedMotion();
  const [role, setRole] = useState<"candidate" | "company">("candidate");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { auth, login, dummyAccounts } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/home";

  if (auth.isLoggedIn) {
    return <Navigate to={from} replace />;
  }

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
          <p className="text-xs uppercase tracking-[0.4em] text-ink/40">Login</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">로그인</h1>
          <p className="mt-2 text-sm text-ink/60">기업/지원자 계정으로 접속하세요.</p>

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
            <Field
              label="아이디"
              placeholder="아이디 입력"
              value={userId}
              onChange={setUserId}
            />
            <Field
              label="비밀번호"
              placeholder="비밀번호 입력"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>

          <button
            type="button"
            className="mt-8 w-full rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-accentStrong"
            onClick={() => {
              const ok = login(userId.trim(), password, role === "company" ? "company" : "student");
              if (!ok) {
                setError("아이디/비밀번호 또는 역할이 일치하지 않습니다.");
                return;
              }
              setError("");
              navigate(from, { replace: true });
            }}
          >
            로그인
          </button>
          {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

          <div className="mt-6 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-xs text-ink/70">
            <p className="font-semibold text-ink/80">더미 계정</p>
            <div className="mt-2 grid gap-2">
              {dummyAccounts.map((account) => (
                <button
                  key={account.userId}
                  type="button"
                  className="flex items-center justify-between rounded-lg border border-ink/10 bg-white px-3 py-2 text-left text-xs hover:border-ink/30"
                  onClick={() => {
                    setUserId(account.userId);
                    setPassword(account.password);
                    setRole(account.role === "company" ? "company" : "candidate");
                  }}
                >
                  <span>
                    {account.role === "company" ? "기업" : "학생"} / {account.userId}
                  </span>
                  <span className="text-ink/50">자동 입력</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-ink/60">
            계정이 없나요?{" "}
            <Link className="font-semibold text-accent" to="/signup">
              회원가입
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
  value?: string;
  onChange?: (value: string) => void;
};

function Field({ label, placeholder, type = "text", value, onChange }: FieldProps) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
        {label}
      </label>
      <input
        className="mt-2 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent/50 focus:outline-none"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
}
