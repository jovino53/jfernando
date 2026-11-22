import { ChevronRight, Lock, Sparkles } from 'lucide-react';

type SidebarPanelProps = {
  userName?: string;
  companyName?: string;
  connected?: boolean;
  latency?: string;
};

const menuItems = ['Painel', 'Operacoes', 'Historico', 'Alertas', 'Relatorios', 'Configuracoes'];

export default function SidebarPanel({ userName, companyName, connected = true, latency = '22 ms' }: SidebarPanelProps) {
  return (
    <aside className="border-b border-white/10 bg-white/5 px-5 py-5 backdrop-blur lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/20">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide">Nexus Ops</p>
          <p className="text-xs text-slate-400">Painel de controle</p>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={item}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
              index === 0 ? 'bg-white/10 text-white ring-1 ring-white/10' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <span>{item}</span>
            <ChevronRight size={16} className="opacity-60" />
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
            <Lock size={18} />
          </div>
          <div>
            <p className="text-sm font-medium">Sessao segura</p>
            <p className="text-xs text-slate-400">Criptografia ativa</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-slate-400">Latencia</p>
            <p className="text-sm font-semibold text-white">{latency}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3">
            <p className="text-slate-400">Conexao</p>
            <p className="text-sm font-semibold text-white">{connected ? 'Online' : 'Offline'}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Usuario</p>
            <p className="mt-1 text-sm font-medium">{userName || 'Conta principal'}</p>
          </div>
          <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">Online</div>
        </div>
        <div className="mt-2 text-xs text-slate-400">{companyName || 'Empresa conectada'}</div>
      </div>
    </aside>
  );
}
