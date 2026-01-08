import { Calendar, ClipboardList, Search } from "lucide-react";

const notices = [
  {
    id: "NL-2401",
    title: "Stock Prediction Transformer Model - Data Preprocessing",
    lab: "B 교수 산업공학 연구실",
    duration: "1개월",
    deadline: "2026.02.10",
    status: "모집중",
  },
  {
    id: "NL-2402",
    title: "Bio-Signal Classification - Feature Extraction",
    lab: "NeuroTech 연구그룹",
    duration: "3주",
    deadline: "2026.02.05",
    status: "모집중",
  },
  {
    id: "NL-2403",
    title: "Smart Campus Energy Forecasting - Data Labeling",
    lab: "스마트 시스템 연구실",
    duration: "2주",
    deadline: "2026.01.30",
    status: "마감 임박",
  },
];

export default function Notices() {
  return (
    <div className="bg-white text-navy">
      <section className="bg-white py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Notices
            </p>
            <h1 className="text-3xl font-semibold">공고 게시판</h1>
            <p className="text-base text-navy/70">
              연구실에서 올린 마이크로 태스크 공고를 확인하고 바로 지원하세요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-navy/10 bg-slate px-4 py-3 text-sm text-navy/70">
            <Search className="h-4 w-4 text-accent" />
            키워드나 연구실명으로 공고를 검색할 수 있습니다.
          </div>
        </div>
      </section>

      <section className="bg-slate py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.2fr_2.2fr_1.2fr_1.2fr_1fr] gap-4 border-b border-navy/10 bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-navy/50 md:grid">
              <span>번호</span>
              <span>공고 제목</span>
              <span>연구실</span>
              <span>기간</span>
              <span>마감</span>
            </div>
            <div className="divide-y divide-navy/10">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="flex flex-col gap-3 px-6 py-5 md:grid md:grid-cols-[1.2fr_2.2fr_1.2fr_1.2fr_1fr] md:items-center"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-navy">
                    <ClipboardList className="h-4 w-4 text-accent" />
                    {notice.id}
                  </div>
                  <div className="text-base font-semibold text-navy">
                    {notice.title}
                    <span className="ml-3 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {notice.status}
                    </span>
                  </div>
                  <div className="text-sm text-navy/70">{notice.lab}</div>
                  <div className="text-sm text-navy/70">{notice.duration}</div>
                  <div className="flex items-center gap-2 text-sm text-navy/70">
                    <Calendar className="h-4 w-4 text-accent" />
                    {notice.deadline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
