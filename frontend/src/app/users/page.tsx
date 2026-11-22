'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import api from '@/services/api';
import { CheckCircle, Loader2, UserPlus } from 'lucide-react';

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: { id: string; name: string; slug: string } | null;
};

const roles = [
  'SUPER_ADMIN',
  'ADMIN',
  'HR',
  'MANAGER',
  'EMPLOYEE',
];

export default function UsersPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<SessionUser | null>(null);
  const [users, setUsers] = useState<SessionUser[]>([]);
  const [toast, setToast] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState('EMPLOYEE');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }

    const loadProfile = async () => {
      try {
        const response = (await api.get('/auth/profile')) as SessionUser;
        setProfile(response);
        setName('');
        setEmail('');
        const team = (await api.get('/auth/users')) as SessionUser[];
        setUsers(team || []);
      } catch {
        router.replace('/login');
      }
    };

    loadProfile();
  }, [router]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  };

  const addUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!profile?.company?.name) {
      showToast('Empresa não encontrada na sessão.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        role,
        companyName: profile.company.name,
      });
      showToast('Usuário criado com sucesso!');
      setName('');
      setEmail('');
      setPassword('123456');
      setRole('EMPLOYEE');
      const team = (await api.get('/auth/users')) as SessionUser[];
      setUsers(team || []);
    } catch {
      showToast('Não foi possível criar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Usuários" />
        <main className="flex-1 overflow-y-auto p-6">
          {toast && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '1s' }}>
              <CheckCircle size={20} />
              <p className="font-medium text-sm">{toast}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Usuários da conta</h1>
              <p className="text-sm text-gray-500 mt-1">Gerencie usuários da empresa {profile?.company?.name || 'carregando...'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-1">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Usuário atual</h2>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="font-medium text-gray-900">{profile?.name || 'Carregando...'}</p>
                <p className="text-sm text-gray-500 mt-1">{profile?.email}</p>
                <p className="text-xs text-gray-400 mt-2">{profile?.role}</p>
                <p className="text-xs text-gray-400 mt-1">{profile?.company?.name}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <UserPlus size={18} className="text-primary-600" />
                <h2 className="text-lg font-bold text-gray-900">Novo usuário</h2>
              </div>
              <form onSubmit={addUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nome" value={name} onChange={setName} />
                <Field label="Email" type="email" value={email} onChange={setEmail} />
                <Field label="Senha" type="password" value={password} onChange={setPassword} />
                <label className="block">
                  <span className="mb-2 block text-sm text-gray-700">Função</span>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    {roles.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="md:col-span-2 flex justify-end">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-white hover:bg-primary-700">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
                    Criar usuário
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Usuários da empresa</h2>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {users.map((item) => (
                <div key={item.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.email}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span>{item.role}</span>
                    <span>{item.company?.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
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
      <span className="mb-2 block text-sm text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </label>
  );
}
