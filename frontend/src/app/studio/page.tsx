'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { AlertCircle, ArrowRight, Copy, Loader2, LogOut, Sparkles, UserCircle2, Wand2 } from 'lucide-react';

type Brief = {
  id?: string;
  topic: string;
  market: string;
  period: string;
  audience: string;
  tone: string;
  objective: string;
  trendScore: number;
  trendSignal: string;
  trendSource?: string;
  trendMatches?: Array<{
    rank: number;
    title: string;
    traffic: string;
    articles: number;
    queries: string[];
    signal: string;
  }>;
  rationale: string;
  risingQueries: string[];
  keywords: string[];
  articleIdeas: Array<{ title: string; angle: string; slug: string }>;
  outline: Array<{ section: string; bullets: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  metaDescription: string;
  cta: string;
  generatedAt: string;
  createdAt?: string;
  updatedAt?: string;
};

type Article = {
  id: string;
  briefingId?: string;
  title: string;
  slug: string;
  status: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  outline: Array<{ section: string; bullets: string[] }>;
  cta?: string;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: { id: string; name: string; slug: string } | null;
};

type FormState = {
  topic: string;
  market: string;
  period: string;
  audience: string;
  tone: string;
  objective: string;
};

const defaultForm: FormState = {
  topic: 'inteligência artificial para marketing',
  market: 'BR',
  period: '7d',
  audience: 'gestores de marketing',
  tone: 'estrategico',
  objective: 'trafego',
};

const toneLabel: Record<string, string> = {
  estrategico: 'Estratégico',
  didatico: 'Didático',
  direto: 'Direto',
};

function buildFallbackBrief(form: FormState): Brief {
  const topic = form.topic.trim() || 'tendencia do momento';
  const baseKeywords = topic
    .split(' ')
    .filter(Boolean)
    .slice(0, 4);

  return {
    topic,
    market: form.market,
    period: form.period,
    audience: form.audience,
    tone: toneLabel[form.tone] || form.tone,
    objective: form.objective,
    trendScore: 78,
    trendSignal: 'Em crescimento',
    rationale: `O tema ${topic} apresenta volume crescente e intenção clara para produção de conteúdo editorial.`,
    risingQueries: [
      `${topic} como funciona`,
      `${topic} vale a pena`,
      `melhores ferramentas de ${baseKeywords[0] || 'conteudo'}`,
    ],
    keywords: [topic, ...baseKeywords, 'seo', 'blog'],
    articleIdeas: [
      { title: `O guia definitivo de ${topic}`, angle: 'educacional', slug: topic.replace(/\s+/g, '-') },
      { title: `Como usar ${topic} para gerar leads`, angle: 'conversão', slug: `${topic.replace(/\s+/g, '-')}-leads` },
      { title: `${topic}: erros comuns e como evitar`, angle: 'comparativo', slug: `${topic.replace(/\s+/g, '-')}-erros` },
    ],
    outline: [
      { section: 'Introdução', bullets: ['Contexto da tendência', 'Por que o tema importa agora'] },
      { section: 'Aplicação prática', bullets: ['Casos de uso', 'Passo a passo', 'Ferramentas recomendadas'] },
      { section: 'Conclusão', bullets: ['Resumo', 'CTA para aprofundar'] },
    ],
    faqs: [
      { question: `O que é ${topic}?`, answer: 'Uma breve explicação do conceito e do momento de interesse.' },
      { question: `Como usar ${topic} no blog?`, answer: 'Escolha um ângulo, valide a intenção de busca e escreva para a dúvida principal.' },
    ],
    metaDescription: `Aprenda a transformar ${topic} em um artigo otimizado para SEO, com títulos, keywords e estrutura editorial.`,
    cta: 'Baixe o briefing e comece o rascunho agora.',
    generatedAt: new Date().toISOString(),
  };
}

export default function StudioPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(defaultForm);
  const [brief, setBrief] = useState<Brief>(() => buildFallbackBrief(defaultForm));
  const [liveTrends, setLiveTrends] = useState<Brief['trendMatches']>([]);
  const [history, setHistory] = useState<Brief[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleDraft, setArticleDraft] = useState<Article | null>(null);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [articleLoading, setArticleLoading] = useState(false);
  const [savingArticle, setSavingArticle] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }

    const loadTrends = async () => {
      try {
        const response = (await api.get('/content-planner/trends?market=BR')) as { items?: Brief['trendMatches'] };
        setLiveTrends(response.items || []);
      } catch {
        setLiveTrends([]);
      }
    };

    const loadHistory = async () => {
      try {
        const response = (await api.get('/content-planner/briefings')) as Brief[];
        setHistory(response || []);
      } catch {
        setHistory([]);
      }
    };

    const loadArticles = async () => {
      try {
        const response = (await api.get('/content-planner/articles')) as Article[];
        setArticles(response || []);
        setArticleDraft((current) => current || response?.[0] || null);
      } catch {
        setArticles([]);
      }
    };

    const loadProfile = async () => {
      try {
        const response = (await api.get('/auth/profile')) as SessionUser;
        setSessionUser(response);
      } catch {
        setSessionUser(null);
      }
    };

    loadTrends();
    loadHistory();
    loadArticles();
    loadProfile();
  }, [router]);

  const generateBrief = async () => {
    setLoading(true);
    setError('');

    try {
      const response = (await api.post('/content-planner/generate', form)) as Brief;
      setBrief(response);
      const saved = (await api.get('/content-planner/briefings')) as Brief[];
      setHistory(saved || []);
    } catch {
      setBrief(buildFallbackBrief(form));
      setError('Backend indisponível no momento. Usei um briefing local como fallback.');
    } finally {
      setLoading(false);
    }
  };

  const copyTitle = async (title: string) => {
    if (typeof navigator !== 'undefined') {
      await navigator.clipboard.writeText(title);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    router.replace('/login');
  };

  const generateArticle = async (ideaTitle?: string) => {
    setArticleLoading(true);
    setError('');

    try {
      const selectedTitle = ideaTitle || brief.articleIdeas[0]?.title || `Artigo sobre ${brief.topic}`;
      const response = (await api.post('/content-planner/articles/generate', {
        briefingId: brief.id,
        title: selectedTitle,
        topic: brief.topic,
        seoTitle: selectedTitle,
        metaDescription: brief.metaDescription,
        keywords: brief.keywords,
        outline: brief.outline,
        cta: brief.cta,
        rationale: brief.rationale,
        articleIdeas: brief.articleIdeas,
        faqs: brief.faqs,
      })) as Article;
      setArticleDraft(response);
      const saved = (await api.get('/content-planner/articles')) as Article[];
      setArticles(saved || []);
    } catch {
      setError('Não foi possível gerar o artigo agora.');
    } finally {
      setArticleLoading(false);
    }
  };

  const saveArticle = async () => {
    if (!articleDraft) return;

    setSavingArticle(true);
    setError('');

    try {
      const response = (await api.post(`/content-planner/articles/${articleDraft.id}`, {
        title: articleDraft.title,
        slug: articleDraft.slug,
        content: articleDraft.content,
        seoTitle: articleDraft.seoTitle,
        metaDescription: articleDraft.metaDescription,
        keywords: articleDraft.keywords,
        outline: articleDraft.outline,
        cta: articleDraft.cta,
        status: articleDraft.status,
      })) as Article;
      setArticleDraft(response);
      const saved = (await api.get('/content-planner/articles')) as Article[];
      setArticles(saved || []);
    } catch {
      setError('Não foi possível salvar o artigo.');
    } finally {
      setSavingArticle(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs text-indigo-200">
                <Sparkles size={14} />
                TrendPress Studio
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Pauta editorial a partir de tendências.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Informe um tema, valide o potencial de interesse e receba briefing, títulos, SEO e outline prontos para produção.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {sessionUser && (
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <UserCircle2 size={18} className="text-indigo-300" />
                  <div>
                    <p className="text-sm font-medium text-white">{sessionUser.name}</p>
                    <p className="text-xs text-slate-400">{sessionUser.company?.name || 'Conta pessoal'}</p>
                  </div>
                </div>
              )}
              <button
                onClick={generateBrief}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                Gerar briefing
              </button>
              <button
                onClick={logout}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <h2 className="text-lg font-semibold">Configuração do briefing</h2>
            <div className="mt-4 space-y-4">
              <Field label="Tema" value={form.topic} onChange={(value) => setForm({ ...form, topic: value })} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Mercado" value={form.market} onChange={(value) => setForm({ ...form, market: value })} />
                <Field label="Período" value={form.period} onChange={(value) => setForm({ ...form, period: value })} />
              </div>
              <Field label="Público" value={form.audience} onChange={(value) => setForm({ ...form, audience: value })} />
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField label="Tom" value={form.tone} onChange={(value) => setForm({ ...form, tone: value })} options={[['estrategico', 'Estratégico'], ['didatico', 'Didático'], ['direto', 'Direto']]} />
                <SelectField label="Objetivo" value={form.objective} onChange={(value) => setForm({ ...form, objective: value })} options={[['trafego', 'Tráfego'], ['leads', 'Leads'], ['autoridade', 'Autoridade']]} />
              </div>
              <button
                onClick={generateBrief}
                className="w-full rounded-xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-400"
              >
                Montar briefing
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/15 bg-emerald-500/10 p-5 text-emerald-50">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Sinal detectado</p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-3xl font-semibold">{brief.trendScore}%</p>
                <p className="mt-1 text-sm text-emerald-100/80">{brief.trendSignal}</p>
              </div>
              <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm">{brief.market} • {brief.period}</div>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-emerald-200">Fonte: {brief.trendSource || 'Google Trends'}</p>
            <p className="mt-4 text-sm leading-6 text-emerald-100/85">{brief.rationale}</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}
        </aside>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Ideias de artigo</p>
                <h2 className="mt-1 text-xl font-semibold">{brief.topic}</h2>
              </div>
              <button
                onClick={() => generateArticle()}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
              >
                {articleLoading ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                Gerar artigo
              </button>
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {brief.articleIdeas.map((idea) => (
                <article key={idea.slug} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">{idea.angle}</p>
                  <h3 className="mt-2 text-base font-semibold leading-6">{idea.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">Slug: {idea.slug}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => copyTitle(idea.title)}
                      className="inline-flex items-center gap-2 text-sm text-indigo-300 transition hover:text-indigo-200"
                    >
                      <Copy size={14} />
                      Copiar título
                    </button>
                    <button
                      onClick={() => generateArticle(idea.title)}
                      className="inline-flex items-center gap-2 text-sm text-emerald-300 transition hover:text-emerald-200"
                    >
                      <Wand2 size={14} />
                      Gerar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Queries em alta" items={brief.risingQueries} />
            <Card title="Keywords SEO" items={brief.keywords} />
          </div>

          {liveTrends?.length ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Tendências ao vivo</h2>
                <span className="text-xs text-slate-400">Google Trends BR</span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {liveTrends.slice(0, 6).map((item) => (
                  <div key={`${item.rank}-${item.title}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs text-indigo-200">#{item.rank}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                      <span>{item.signal}</span>
                      <span>{item.traffic}</span>
                      <span>{item.articles} artigos</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {brief.trendMatches?.length ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold">Tópicos detectados no Trends</h2>
              <div className="mt-4 grid gap-3">
                {brief.trendMatches.map((item) => (
                  <div key={`${item.rank}-${item.title}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">#{item.rank}</p>
                        <p className="mt-1 font-medium text-white">{item.title}</p>
                      </div>
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">{item.signal}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                      <span>Tráfego: {item.traffic}</span>
                      <span>Artigos: {item.articles}</span>
                    </div>
                    {item.queries.length ? <p className="mt-3 text-sm text-slate-300">{item.queries.join(' • ')}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Histórico recente</h2>
              <span className="text-xs text-slate-400">{history.length} briefings salvos</span>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {history.slice(0, 6).map((item) => (
                <div key={item.id || `${item.topic}-${item.generatedAt}`} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{item.topic}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.audience} • {item.market}</p>
                    </div>
                    <span className="rounded-full bg-indigo-500/15 px-2.5 py-1 text-xs text-indigo-200">{item.trendScore}%</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{item.rationale}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{item.trendSignal}</span>
                    <span>{new Date(item.createdAt || item.generatedAt).toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Editor</p>
                <h2 className="mt-1 text-lg font-semibold">Artigo completo</h2>
              </div>
              <button
                onClick={saveArticle}
                disabled={!articleDraft}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingArticle ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Salvar
              </button>
            </div>

            {articleDraft ? (
              <div className="mt-4 grid gap-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Título" value={articleDraft.title} onChange={(value) => setArticleDraft({ ...articleDraft, title: value })} />
                  <Field label="SEO Title" value={articleDraft.seoTitle} onChange={(value) => setArticleDraft({ ...articleDraft, seoTitle: value })} />
                </div>
                <Field label="Meta description" value={articleDraft.metaDescription} onChange={(value) => setArticleDraft({ ...articleDraft, metaDescription: value })} />
                <Field label="Slug" value={articleDraft.slug} onChange={(value) => setArticleDraft({ ...articleDraft, slug: value })} />
                <Field
                  label="Keywords"
                  value={articleDraft.keywords.join(', ')}
                  onChange={(value) => setArticleDraft({ ...articleDraft, keywords: value.split(',').map((item) => item.trim()).filter(Boolean) })}
                />
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Status</span>
                  <select
                    value={articleDraft.status}
                    onChange={(e) => setArticleDraft({ ...articleDraft, status: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="REVIEW">Review</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-slate-300">Conteúdo</span>
                  <textarea
                    value={articleDraft.content}
                    onChange={(e) => setArticleDraft({ ...articleDraft, content: e.target.value })}
                    className="min-h-[360px] w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-indigo-400"
                  />
                </label>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-6 text-sm text-slate-400">
                Gere um artigo para abrir o editor.
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Artigos salvos</h2>
              <span className="text-xs text-slate-400">{articles.length} itens</span>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {articles.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setArticleDraft(item)}
                  className={`rounded-2xl border p-4 text-left transition ${articleDraft?.id === item.id ? 'border-indigo-400 bg-indigo-500/10' : 'border-white/10 bg-slate-950/60 hover:bg-slate-950'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{item.title}</p>
                    <span className="text-xs text-slate-400">{item.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.slug}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.metaDescription}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Outline do artigo</h2>
            <div className="mt-4 space-y-4">
              {brief.outline.map((section) => (
                <div key={section.section} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="font-medium text-white">{section.section}</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <ArrowRight size={14} className="mt-0.5 shrink-0 text-indigo-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold">Meta description</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{brief.metaDescription}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold">CTA sugerido</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{brief.cta}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">Público: {brief.audience}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold">Perguntas frequentes</h2>
            <div className="mt-4 grid gap-3">
              {brief.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="font-medium text-white">{faq.question}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-indigo-400"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400"
      >
        {options.map(([optValue, optLabel]) => (
          <option key={optValue} value={optValue} className="bg-slate-950">
            {optLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-sm text-slate-200">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
