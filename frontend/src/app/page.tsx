'use client';

import { useState } from 'react';
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clapperboard,
  Clock3,
  FileText,
  Film,
  FolderOpen,
  Gauge,
  Hash,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
  Upload,
  Users,
  X,
  Zap,
} from 'lucide-react';

type Project = {
  title: string;
  type: string;
  status: string;
  date: string;
  color: string;
  icon: string;
};

const initialProjects: Project[] = [
  { title: 'A verdade sobre ganhar dinheiro com IA', type: 'Vídeo longo', status: 'Roteiro pronto', date: 'Hoje, 14:30', color: 'from-orange-500 to-rose-500', icon: '01' },
  { title: '3 ferramentas que dobraram minha produtividade', type: 'Short', status: 'Em edição', date: 'Ontem', color: 'from-sky-500 to-indigo-600', icon: '02' },
  { title: 'Como eu organizo minha semana', type: 'Vídeo longo', status: 'Agendado', date: '12 Jun, 09:00', color: 'from-emerald-400 to-teal-700', icon: '03' },
];

const navItems = [
  { label: 'Visão geral', icon: LayoutDashboard },
  { label: 'Meus projetos', icon: FolderOpen },
  { label: 'Calendário', icon: CalendarDays },
  { label: 'Biblioteca', icon: BookOpen },
];

export default function HomePage() {
  const [activeNav, setActiveNav] = useState('Visão geral');
  const [filter, setFilter] = useState('Todos');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const [scriptTitle, setScriptTitle] = useState('A verdade sobre ganhar dinheiro com IA');
  const [script, setScript] = useState('');
  const [scriptSaved, setScriptSaved] = useState(false);
  const [videoDescription, setVideoDescription] = useState('');
  const [videoTags, setVideoTags] = useState('');
  const [projects, setProjects] = useState(initialProjects);

  const filteredProjects = projects.filter((project) => {
    const matchesQuery = project.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'Todos' || project.type === filter || (filter === 'Em andamento' && project.status === 'Em edição');
    return matchesQuery && matchesFilter;
  });

  const createProject = (type: string) => {
    const newProject: Project = {
      title: type === 'Short' ? 'Novo Short sem título' : 'Novo vídeo sem título',
      type,
      status: 'Rascunho',
      date: 'Agora',
      color: type === 'Short' ? 'from-violet-500 to-fuchsia-600' : 'from-amber-400 to-orange-600',
      icon: String(projects.length + 1).padStart(2, '0'),
    };
    setProjects([newProject, ...projects]);
    setShowCreator(false);
    setFilter('Todos');
  };

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-[#17191d]">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-30 flex w-[252px] flex-col border-r border-black/[0.07] bg-[#fbfbf9] px-5 py-6 transition-transform lg:static lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#17191d] text-white"><Play size={16} fill="currentColor" /></span>
              <span className="text-[18px] font-bold tracking-[-0.04em]">frame<span className="text-[#f05c37]">.ai</span></span>
            </div>
            <button onClick={() => setMenuOpen(false)} className="rounded-lg p-1 text-black/40 lg:hidden"><X size={18} /></button>
          </div>

          <div className="mt-10">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">Workspace</p>
            <nav className="mt-3 space-y-1">
              {navItems.map(({ label, icon: Icon }) => (
                <button key={label} onClick={() => { setActiveNav(label); setMenuOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${activeNav === label ? 'bg-[#ecece8] text-[#17191d]' : 'text-black/50 hover:bg-black/[0.035] hover:text-black/80'}`}>
                  <Icon size={17} strokeWidth={activeNav === label ? 2.4 : 1.8} />{label}
                  {label === 'Meus projetos' && <span className="ml-auto rounded-md bg-black/[0.07] px-1.5 py-0.5 text-[10px] text-black/45">{projects.length}</span>}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-9">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">Ferramentas</p>
            <nav className="mt-3 space-y-1">
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-black/50 transition hover:bg-black/[0.035] hover:text-black/80"><Sparkles size={17} />Roteiro com IA <span className="ml-auto rounded bg-[#f05c37]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#e24b28]">PRO</span></button>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-black/50 transition hover:bg-black/[0.035] hover:text-black/80"><Hash size={17} />SEO & títulos</button>
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-black/50 transition hover:bg-black/[0.035] hover:text-black/80"><Gauge size={17} />Analytics</button>
            </nav>
          </div>

          <div className="mt-auto rounded-2xl bg-[#17191d] p-4 text-white">
            <div className="flex items-start justify-between"><Zap size={17} className="text-[#ff9d65]" fill="currentColor" /><span className="text-[10px] text-white/40">PLANO PRO</span></div>
            <p className="mt-5 text-[13px] font-semibold">Seu próximo vídeo está a um clique.</p>
            <p className="mt-1 text-[11px] leading-5 text-white/50">Crie mais, edite menos e publique melhor.</p>
            <button onClick={() => setShowCreator(true)} className="mt-4 flex w-full items-center justify-center rounded-lg bg-white py-2 text-[11px] font-semibold text-[#17191d] transition hover:bg-[#ffede5]">Começar agora <ChevronRight size={14} /></button>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-black/[0.07] pt-5"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2b59d] text-[11px] font-bold">RC</div><div className="min-w-0"><p className="truncate text-[12px] font-semibold">Rafael Costa</p><p className="truncate text-[10px] text-black/40">Canal principal</p></div><Settings2 size={15} className="ml-auto text-black/35" /></div>
        </aside>

        {menuOpen && <button aria-label="Fechar menu" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-20 bg-black/20 lg:hidden" />}

        <section className="min-w-0 flex-1">
          <header className="flex h-[76px] items-center justify-between border-b border-black/[0.07] bg-[#f9f9f7] px-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3"><button onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-black/55 lg:hidden"><Menu size={20} /></button><div className="hidden items-center gap-2 text-[12px] text-black/40 sm:flex"><span>Workspace</span><ChevronRight size={13} /><span className="font-medium text-black/70">{activeNav}</span></div><div className="flex items-center gap-2 sm:hidden"><Clapperboard size={18} /><span className="text-sm font-bold">{activeNav}</span></div></div>
            <div className="flex items-center gap-3"><button className="relative rounded-xl p-2 text-black/45 transition hover:bg-black/[0.04]"><Bell size={18} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#f05c37]" /></button><div className="hidden h-6 w-px bg-black/10 sm:block" /><button className="hidden items-center gap-2 rounded-xl px-2 py-1 text-left sm:flex"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f2b59d] text-[10px] font-bold">RC</span><ChevronDown size={14} className="text-black/35" /></button></div>
          </header>

          <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e05a38]">Quarta-feira, 12 de junho</p><h1 className="mt-2 text-[30px] font-bold tracking-[-0.055em] sm:text-[38px]">Bom dia, Rafael <span className="text-[#f05c37]">.</span></h1><p className="mt-2 text-[13px] text-black/45">Aqui está o pulso do seu canal hoje.</p></div><button onClick={() => setShowCreator(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f05c37] px-4 py-3 text-[12px] font-bold text-white shadow-[0_8px_20px_rgba(240,92,55,0.2)] transition hover:bg-[#dd4d2c]"><Plus size={16} />Novo projeto</button></div>

            <div className="mt-8 grid gap-4 lg:grid-cols-[1.45fr_1fr]">
              <section className="relative overflow-hidden rounded-[22px] bg-[#17191d] p-6 text-white sm:p-8"><div className="absolute -right-12 -top-24 h-72 w-72 rounded-full bg-[#f05c37]/20 blur-3xl" /><div className="relative max-w-[490px]"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ffad8b]"><span className="h-1.5 w-1.5 rounded-full bg-[#ff8a64]" />Assistente de criação</div><h2 className="mt-5 text-[26px] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[32px]">Transforme uma ideia em um vídeo que as pessoas querem assistir.</h2><p className="mt-4 max-w-[400px] text-[13px] leading-6 text-white/50">Comece com um tema. A IA cuida do roteiro, título, estrutura e dos cortes que seguram a atenção.</p><button onClick={() => setShowCreator(true)} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-[12px] font-bold text-[#17191d] transition hover:bg-[#fff0e9]"><Sparkles size={15} className="text-[#f05c37]" />Criar com IA <ChevronRight size={14} /></button></div><div className="absolute bottom-6 right-7 hidden w-[190px] rotate-[-5deg] rounded-xl border border-white/10 bg-white/[0.07] p-2 shadow-2xl sm:block"><div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-[#9b4c32] via-[#3d2524] to-[#16171b]"><Play size={20} fill="white" /></div><div className="mt-2 flex gap-1"><span className="h-1 w-8 rounded bg-[#f05c37]" /><span className="h-1 w-4 rounded bg-white/20" /><span className="h-1 w-6 rounded bg-white/20" /></div></div></section>
              <section className="rounded-[22px] border border-black/[0.07] bg-[#fbfbf9] p-6"><div className="flex items-start justify-between"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/35">Performance do canal</p><p className="mt-3 text-[30px] font-bold tracking-[-0.06em]">48.2K</p><p className="mt-1 text-[12px] text-black/40">visualizações este mês</p></div><span className="flex items-center gap-1 rounded-lg bg-[#e5f5eb] px-2 py-1 text-[10px] font-bold text-[#358454]"><TrendingUp size={12} /> 18.4%</span></div><div className="mt-5 flex h-[72px] items-end gap-1.5 sm:gap-2">{[27, 38, 34, 49, 42, 61, 54, 68, 58, 73, 64, 88, 78, 100].map((height, i) => <div key={i} className={`flex-1 rounded-t-sm ${i > 10 ? 'bg-[#f05c37]' : 'bg-[#f4c4b4]'}`} style={{ height: `${height}%` }} />)}</div><div className="mt-3 flex justify-between text-[10px] text-black/30"><span>01 Jun</span><span>12 Jun</span></div></section>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4"><Stat icon={Film} label="Vídeos publicados" value="24" meta="+4 este mês" tone="orange" /><Stat icon={Users} label="Inscritos" value="12.8K" meta="+6.2% vs. mês anterior" tone="green" /><Stat icon={Clock3} label="Tempo de exibição" value="1.4K h" meta="+12.8% este mês" tone="blue" /><Stat icon={TrendingUp} label="CTR médio" value="8.6%" meta="acima da média" tone="purple" /></div>

            <div className="mt-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-[19px] font-bold tracking-[-0.035em]">Seus projetos</h2><p className="mt-1 text-[12px] text-black/40">Continue de onde parou.</p></div><div className="flex flex-wrap items-center gap-2"><div className="flex items-center rounded-xl border border-black/[0.08] bg-white px-3 py-2"><Search size={14} className="mr-2 text-black/30" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar projeto" className="w-[115px] bg-transparent text-[11px] outline-none placeholder:text-black/30" /></div><div className="flex gap-1 rounded-xl bg-black/[0.035] p-1">{['Todos', 'Vídeo longo', 'Short', 'Em andamento'].map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition ${filter === item ? 'bg-white text-black shadow-sm' : 'text-black/40 hover:text-black/70'}`}>{item}</button>)}</div></div></div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredProjects.map((project) => <ProjectCard key={`${project.title}-${project.icon}`} project={project} />)}{filteredProjects.length === 0 && <div className="col-span-full rounded-2xl border border-dashed border-black/10 py-12 text-center text-sm text-black/40">Nenhum projeto encontrado.</div>}</div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"><section className="rounded-[22px] border border-black/[0.07] bg-[#fbfbf9] p-6"><div className="flex items-center justify-between"><div><h2 className="text-[17px] font-bold tracking-[-0.03em]">Próximas publicações</h2><p className="mt-1 text-[11px] text-black/40">Seu calendário editorial</p></div><button className="text-[11px] font-semibold text-[#e45735]">Ver calendário <ChevronRight size={13} className="inline" /></button></div><div className="mt-5 space-y-2"><Schedule day="12" month="JUN" title="A verdade sobre ganhar dinheiro com IA" time="Hoje, 14:30" status="Roteiro pronto" color="orange" /><Schedule day="15" month="JUN" title="3 ferramentas que dobraram minha produtividade" time="Sáb, 09:00" status="Em edição" color="blue" /></div></section><section className="rounded-[22px] border border-black/[0.07] bg-[#fbfbf9] p-6"><div className="flex items-center justify-between"><div><h2 className="text-[17px] font-bold tracking-[-0.03em]">Inspiração rápida</h2><p className="mt-1 text-[11px] text-black/40">Temas em alta no seu nicho</p></div><span className="rounded-lg bg-[#fff0e9] px-2 py-1 text-[10px] font-bold text-[#e45735]">Atualizado agora</span></div><div className="mt-5 space-y-3"><Trend number="01" title="IA para criadores" search="+240% nas buscas" /><Trend number="02" title="Rotina produtiva" search="+86% nas buscas" /><Trend number="03" title="Ferramentas no-code" search="+62% nas buscas" /></div></section></div>
          </div>
        </section>
      </div>

      {showCreator && <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#17191d]/50 p-5 backdrop-blur-sm"><div className="w-full max-w-[480px] rounded-3xl bg-[#fbfbf9] p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e45735]">Novo projeto</p><h2 className="mt-2 text-2xl font-bold tracking-[-0.05em]">Como você quer começar?</h2><p className="mt-2 text-[12px] leading-5 text-black/45">Escolha um formato e deixe o frame.ai cuidar do resto.</p></div><button onClick={() => setShowCreator(false)} className="rounded-lg p-1 text-black/35"><X size={18} /></button></div><div className="mt-7 grid gap-3"><button onClick={() => createProject('Vídeo longo')} className="group flex items-center gap-4 rounded-2xl border border-black/10 p-4 text-left transition hover:border-[#f05c37] hover:bg-[#fff7f3]"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#f05c37]"><Sparkles size={20} /></span><span><strong className="block text-[13px]">Criar com IA</strong><small className="mt-1 block text-[11px] text-black/40">Comece com uma ideia e gere o roteiro completo.</small></span><ChevronRight size={16} className="ml-auto text-black/25 transition group-hover:translate-x-1" /></button><button onClick={() => createProject('Vídeo longo')} className="group flex items-center gap-4 rounded-2xl border border-black/10 p-4 text-left transition hover:border-[#f05c37] hover:bg-[#fff7f3]"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4ff] text-[#5377c8]"><Upload size={19} /></span><span><strong className="block text-[13px]">Subir material</strong><small className="mt-1 block text-[11px] text-black/40">Edite seus arquivos e organize o projeto.</small></span><ChevronRight size={16} className="ml-auto text-black/25 transition group-hover:translate-x-1" /></button><button onClick={() => createProject('Short')} className="group flex items-center gap-4 rounded-2xl border border-black/10 p-4 text-left transition hover:border-[#f05c37] hover:bg-[#fff7f3]"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2edff] text-[#7959c9]"><Clapperboard size={19} /></span><span><strong className="block text-[13px]">Criar um Short</strong><small className="mt-1 block text-[11px] text-black/40">Transforme uma ideia em conteúdo vertical.</small></span><ChevronRight size={16} className="ml-auto text-black/25 transition group-hover:translate-x-1" /></button></div></div></div>}
      <section className="mx-auto mt-10 max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-10"><div className="rounded-[22px] border border-black/[0.07] bg-[#fbfbf9] p-6 sm:p-7"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2"><Hash size={17} className="text-[#e45735]" /><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e45735]">Pesquisa para YouTube</p></div><h2 className="mt-2 text-[21px] font-bold tracking-[-0.045em]">Encontre títulos, descrições e tags.</h2><p className="mt-1 text-[12px] text-black/40">Prepare os metadados do seu vídeo antes de publicar.</p></div><button onClick={() => setScriptTitle('Como criar vídeos melhores com inteligência artificial')} className="rounded-xl bg-[#f05c37] px-4 py-2 text-[11px] font-bold text-white">Pesquisar ideias</button></div><div className="mt-6 grid gap-4 lg:grid-cols-3"><label className="block"><span className="mb-2 block text-[11px] font-semibold text-black/45">Título principal</span><input value={scriptTitle} onChange={(event) => setScriptTitle(event.target.value)} placeholder="Digite o título do vídeo" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] outline-none focus:border-[#f05c37]" /></label><label className="block"><span className="mb-2 block text-[11px] font-semibold text-black/45">Descrição</span><textarea value={videoDescription} onChange={(event) => setVideoDescription(event.target.value)} placeholder="Descreva o conteúdo do vídeo" className="min-h-[82px] w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] outline-none focus:border-[#f05c37]" /></label><label className="block"><span className="mb-2 block text-[11px] font-semibold text-black/45">Tags</span><input value={videoTags} onChange={(event) => setVideoTags(event.target.value)} placeholder="ia, youtube, produtividade" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[12px] outline-none focus:border-[#f05c37]" /><p className="mt-2 text-[10px] text-black/35">Separe as tags por vírgulas.</p></label></div></div></section>
    </main>
  );
}

function Stat({ icon: Icon, label, value, meta, tone }: { icon: typeof Film; label: string; value: string; meta: string; tone: string }) {
  const colors: Record<string, string> = { orange: 'bg-[#fff0e9] text-[#e45735]', green: 'bg-[#e9f7ee] text-[#378456]', blue: 'bg-[#edf3ff] text-[#5275c4]', purple: 'bg-[#f2edff] text-[#7959c9]' };
  return <div className="rounded-2xl border border-black/[0.07] bg-[#fbfbf9] p-4 sm:p-5"><span className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors[tone]}`}><Icon size={16} /></span><p className="mt-4 text-[11px] text-black/40">{label}</p><p className="mt-1 text-[21px] font-bold tracking-[-0.05em]">{value}</p><p className="mt-1 text-[10px] font-medium text-[#378456]">{meta}</p></div>;
}

function ProjectCard({ project }: { project: Project }) {
  return <article className="group overflow-hidden rounded-2xl border border-black/[0.07] bg-[#fbfbf9] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]"><div className={`relative flex aspect-[2/1] items-center justify-center bg-gradient-to-br ${project.color}`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,.25),transparent_28%)]" /><span className="relative text-5xl font-black tracking-[-0.09em] text-white/20">{project.icon}</span><button className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#17191d] opacity-0 shadow-lg transition group-hover:opacity-100"><Play size={13} fill="currentColor" /></button><span className="absolute right-3 top-3 rounded-md bg-black/20 px-2 py-1 text-[9px] font-bold text-white backdrop-blur-sm">{project.type}</span></div><div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="text-[13px] font-bold leading-5 tracking-[-0.02em]">{project.title}</h3><p className="mt-1 text-[10px] text-black/40">Editado {project.date}</p></div><button className="shrink-0 text-black/30"><MoreHorizontal size={17} /></button></div><div className="mt-4 flex items-center justify-between"><span className="flex items-center gap-1.5 text-[10px] font-semibold text-black/50"><span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Agendado' ? 'bg-[#39885a]' : project.status === 'Em edição' ? 'bg-[#e5a72d]' : 'bg-[#f05c37]'}`} />{project.status}</span><button className="text-[10px] font-bold text-[#e45735] opacity-0 transition group-hover:opacity-100">Abrir projeto</button></div></div></article>;
}

function Schedule({ day, month, title, time, status, color }: { day: string; month: string; title: string; time: string; status: string; color: string }) {
  return <div className="flex items-center gap-3 rounded-xl border border-black/[0.06] p-3"><div className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg ${color === 'orange' ? 'bg-[#fff0e9] text-[#e45735]' : 'bg-[#edf3ff] text-[#5275c4]'}`}><span className="text-[15px] font-bold leading-4">{day}</span><span className="text-[8px] font-bold">{month}</span></div><div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold">{title}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-black/40"><Clock3 size={11} />{time}</p></div><span className="hidden rounded-md bg-black/[0.04] px-2 py-1 text-[9px] font-semibold text-black/45 sm:block">{status}</span></div>;
}

function Trend({ number, title, search }: { number: string; title: string; search: string }) {
  return <div className="flex items-center gap-3"><span className="text-[11px] font-bold text-black/25">{number}</span><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1f1ed] text-black/45"><TrendingUp size={14} /></span><div><p className="text-[12px] font-semibold">{title}</p><p className="mt-0.5 text-[10px] text-[#378456]">{search}</p></div><ChevronRight size={14} className="ml-auto text-black/25" /></div>;
}
