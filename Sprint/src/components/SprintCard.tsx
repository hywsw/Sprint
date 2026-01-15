import type { Sprint } from "../data/sprints";

type SprintCardProps = {
  sprint: Sprint;
  compact?: boolean;
};

export default function SprintCard({ sprint, compact = false }: SprintCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/90 p-6 text-ink shadow-[0_25px_70px_-50px_rgba(10,15,31,0.6)] backdrop-blur">
      <div className="flex flex-wrap items-center gap-2">
        {sprint.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70"
          >
            {tag}
          </span>
        ))}
        {sprint.sample && (
          <span className="rounded-full border border-ink/20 px-3 py-1 text-xs font-semibold text-ink/70">
            Sample
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/40">{sprint.company}</p>
          <h3 className="mt-2 text-xl font-semibold text-ink">{sprint.title}</h3>
          <p className="mt-2 text-sm text-ink/70">{sprint.summary}</p>
        </div>
        <div className="grid gap-3 text-sm text-ink/70 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-ink/50">기간</p>
            <p>{sprint.duration}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink/50">결과물</p>
            <p>{sprint.deliverable}</p>
          </div>
          {!compact && (
            <>
              <div>
                <p className="text-xs font-semibold text-ink/50">필요 역량</p>
                <p>{sprint.skills.join(", ")}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-ink/50">보상</p>
                <p>{sprint.reward}</p>
              </div>
            </>
          )}
        </div>
      </div>
      {!compact && (
        <div className="mt-6 rounded-xl bg-ink/5 p-4 text-xs text-ink/70">
          {sprint.note}
        </div>
      )}
    </div>
  );
}
