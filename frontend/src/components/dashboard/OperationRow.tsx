type OperationRowProps = {
  id: string;
  kind: string;
  amount: string;
  status: string;
};

export default function OperationRow({ id, kind, amount, status }: OperationRowProps) {
  return (
    <div className="rounded-2xl bg-white/5 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">{id}</p>
          <p className="text-xs text-slate-400">{kind}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs ${status === 'Aberta' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-slate-200/10 text-slate-300'}`}>
          {status}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-slate-400">Valor</span>
        <span className="font-semibold text-white">{amount}</span>
      </div>
    </div>
  );
}
