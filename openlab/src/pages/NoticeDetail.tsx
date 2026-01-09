import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ClipboardList } from "lucide-react";
import { notices } from "../data/notices";

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();
  const [remoteNotices, setRemoteNotices] = useState<any[] | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/posted-notices').then(r => r.json()).then(j => { if (!mounted) return; if (j?.success && Array.isArray(j.notices)) setRemoteNotices(j.notices); else setRemoteNotices([]); }).catch(() => setRemoteNotices([]));
    return () => { mounted = false; };
  }, []);

  const allNotices = remoteNotices !== null ? [...(remoteNotices || []), ...notices] : notices;
  const notice = allNotices.find((n) => n.id === id);

  const [applying, setApplying] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [serverEvaluation, setServerEvaluation] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!notice) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <p className="text-sm text-red-500">공고를 찾을 수 없습니다.</p>
        <Link to="/notices" className="text-accent underline">
          공고 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && !f.type.startsWith("application/pdf")) {
      alert("PDF 파일만 업로드 가능합니다.");
      return;
    }
    setResumeFile(f);
  };

  const submitApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notice) return;
    setApplying(true);
    setSuccess(null);
    setServerEvaluation(null);

    try {
      const fd = new FormData();
      fd.append("noticeId", notice.id);
      fd.append("name", name);
      fd.append("email", email);
      fd.append("message", message || "");
      if (resumeFile) fd.append("resume", resumeFile, resumeFile.name);

      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const text = await res.text();
      if (!text) {
        throw new Error("서버 응답이 없습니다. 잠시 후 다시 시도하세요.");
      }

      let j: any = null;
      try {
        j = JSON.parse(text);
      } catch (parseErr) {
        console.error("apply response parse error:", parseErr, "raw:", text.slice(0, 200));
        throw new Error("서버 응답을 처리하지 못했습니다. 관리자에게 문의하세요.");
      }

      if (!res.ok || !j?.success) {
        throw new Error(j?.error || "지원에 실패했습니다.");
      }

      setSuccess("지원이 정상적으로 접수되었습니다.");
      setServerEvaluation(j.application?.evaluation || null);
      setApplying(false);
      setName("");
      setEmail("");
      setMessage("");
      setResumeFile(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setApplying(false);
      alert(err.message || "지원 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6">
          <Link to="/notices" className="text-accent underline text-sm">
            ← 공고 목록으로 돌아가기
          </Link>
        </div>

        <div className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-5 w-5 text-accent" />
            <div className="text-xs font-semibold text-navy/70">{notice.id}</div>
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-navy">{notice.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-navy/70">
            <div>{notice.lab}</div>
            <div>{notice.duration}</div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              {notice.deadline}
            </div>
          </div>

          <p className="mt-6 whitespace-pre-line text-sm text-navy/80">{notice.description}</p>

          <div className="mt-8">
            {success && <p className="text-sm text-green-600">{success}</p>}
            {!applying ? (
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white hover:bg-[#1557D6]"
                  onClick={() => setApplying(true)}
                >
                  지원하기
                </button>
                <span className="text-sm text-navy/70">지원 전 공고 내용을 꼭 확인하세요.</span>
              </div>
            ) : (
              <form onSubmit={submitApply} className="mt-4 grid gap-3">
                <input
                  className="rounded-2xl border border-navy/10 px-4 py-3 text-sm outline-none"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  className="rounded-2xl border border-navy/10 px-4 py-3 text-sm outline-none"
                  placeholder="이메일"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <textarea
                  className="rounded-2xl border border-navy/10 px-4 py-3 text-sm outline-none"
                  placeholder="간단한 자기소개 / 지원 동기 (선택)"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex items-center gap-3">
                  <input id="apply-resume" type="file" accept="application/pdf" className="hidden" onChange={handleResumeChange} />
                  <label htmlFor="apply-resume" className="inline-flex items-center gap-2 rounded-full border border-navy/10 px-3 py-1 text-xs font-semibold text-navy cursor-pointer hover:border-navy/40">
                    이력서 첨부 (PDF)
                  </label>
                  {resumeFile && <span className="text-sm text-navy/70">{resumeFile.name}</span>}
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2 text-sm font-semibold text-white hover:bg-navy/90">
                    제출
                  </button>
                  <button type="button" onClick={() => setApplying(false)} className="inline-flex items-center gap-2 rounded-full border border-navy/10 px-4 py-2 text-sm font-semibold text-navy/70">
                    취소
                  </button>
                </div>

                {serverEvaluation && (
                  <div className="mt-4 rounded-lg bg-slate/30 p-4">
                    <p className="text-sm font-semibold">AI 평가 점수: <span className="text-accent">{serverEvaluation.score}</span></p>
                    <ul className="mt-2 text-sm">
                      {serverEvaluation.results?.map((r: any, idx: number) => (
                        <li key={idx} className={`${r.matched ? 'text-green-600' : 'text-navy/70'}`}>{r.criteria} — {r.matched ? '매칭' : '부족'}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm text-navy/70">{serverEvaluation.explanation}</p>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
