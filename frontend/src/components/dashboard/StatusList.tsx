type StatusListProps = {
  title: string;
  items: Array<{ label: string; value: string; tone?: 'good' | 'warn' | 'neutral' }>;
};

export default function StatusList({ title, items }: StatusListProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-950/60 p-5">
      <h3 className="text-sm font-medium text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm">
            <span className="text-slate-400">{item.label}</span>
            <span className={item.tone === 'good' ? 'text-emerald-300' : item.tone === 'warn' ? 'text-amber-300' : 'text-white'}>{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
