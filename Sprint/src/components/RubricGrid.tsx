type RubricGridProps = {
  items: string[];
};

export default function RubricGrid({ items }: RubricGridProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-ink/10 px-3 py-1 text-ink/70"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
