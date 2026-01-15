type TimelineStep = {
  title: string;
  description: string;
};

type TimelineProps = {
  steps: TimelineStep[];
};

export default function Timeline({ steps }: TimelineProps) {
  return (
    <div className="grid gap-6 md:grid-cols-5">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="relative rounded-2xl border border-ink/10 bg-white/90 p-5 shadow-[0_30px_80px_-60px_rgba(10,15,31,0.5)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accentStrong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm font-semibold text-ink">{step.title}</p>
          </div>
          <p className="mt-3 text-sm text-ink/70">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
