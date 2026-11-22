'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/services/api';
import { ArrowRight, Loader2, Sparkles, Users } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('Admin TrendPress');
  const [email, setEmail] = useState('admin@trendpress.studio');
  const [password, setPassword] = useState('123456');
  const [companyName, setCompanyName] = useState('TrendPress Studio');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      router.replace('/');
    }
  }, [router]);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = (await api.post('/auth/register', { name, email, password, companyName })) as { access_token: string; user: any };
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.replace('/');
    } catch {
      setError('Não foi possível criar sua conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_55%,#111827_100%)] px-4 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <Sparkles size={16} />
            TrendPress Studio
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Crie sua conta e comece a publicar mais rápido.</h1>
          <p className="max-w-xl text-lg leading-8 text-slate-300">
            Cada conta já nasce com empresa padrão, acesso ao estúdio e histórico de briefings.
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Users size={18} className="text-emerald-300" />
              Cadastro multiusuário com empresa padrão
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-emerald-950/30 backdrop-blur">
          <h2 className="text-2xl font-semibold">Criar conta</h2>
          <p className="mt-2 text-sm text-slate-400">Preencha os dados para liberar o acesso.</p>
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <Field label="Nome" value={name} onChange={setName} />
            <Field label="Email" type="email" value={email} onChange={setEmail} />
            <Field label="Empresa" value={companyName} onChange={setCompanyName} />
            <Field label="Senha" type="password" value={password} onChange={setPassword} />
            {error && <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:bg-slate-100"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              Criar conta
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
            <span>Já tem conta?</span>
            <Link href="/login" className="text-emerald-300 hover:text-emerald-200">Entrar</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  type?: string;
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
        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400"
      />
    </label>
  );
}
