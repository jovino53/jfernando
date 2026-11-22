'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/services/api';
import { ArrowRight, Loader2, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@trendpress.studio');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      router.replace('/');
    }
  }, [router]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = (await api.post('/auth/login', { email, password })) as { access_token: string; user: any };
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.replace('/');
    } catch {
      setError('Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.2),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#111827_100%)] px-4 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <Sparkles size={16} />
            TrendPress Studio
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Acesse sua central de briefings e artigos.</h1>
          <p className="max-w-xl text-lg leading-8 text-slate-300">
            Entre com sua conta para gerar pautas a partir de tendências, salvar rascunhos e publicar conteúdo mais rápido.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'Login seguro com JWT',
              'Salvar briefings e artigos',
              'Histórico por usuário',
              'Fluxo editorial completo',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <ShieldCheck size={14} className="mr-2 inline-block text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-indigo-950/30 backdrop-blur">
          <h2 className="text-2xl font-semibold">Entrar</h2>
          <p className="mt-2 text-sm text-slate-400">Use sua conta para acessar o estúdio.</p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <Field label="Email" type="email" value={email} onChange={setEmail} />
            <Field label="Senha" type="password" value={password} onChange={setPassword} />
            {error && <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:bg-slate-100"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              Acessar
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
            <span>Sem conta?</span>
            <Link href="/register" className="text-indigo-300 hover:text-indigo-200">Criar cadastro</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400"
      />
    </label>
  );
}
