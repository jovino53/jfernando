import { LucideIcon } from 'lucide-react';

type MetricCardProps = {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
};

export default function MetricCard({ label, value, change, positive = true, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-lg shadow-black/10">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
          <Icon size={18} />
        </div>
      </div>
      {change ? <p className={`mt-3 text-xs ${positive ? 'text-emerald-300' : 'text-rose-300'}`}>{change}</p> : null}
    </div>
  );
}
