type RubricGridProps = {
  items: string[];
};

export default function RubricGrid({ items }: RubricGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {items.map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-ink/10 bg-white/90 px-4 py-6 text-center text-sm font-semibold text-ink shadow-[0_25px_70px_-55px_rgba(10,15,31,0.5)]"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
