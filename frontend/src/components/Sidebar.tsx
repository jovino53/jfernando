'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Colaboradores', href: '/employees', icon: '👥' },
  { name: 'Competências', href: '/competencies', icon: '🎯' },
  { name: 'Perfil Inteligente', href: '/intelligence', icon: '🧠' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Assistente IA', href: '/ai-assistant', icon: '🤖' },
  { name: 'Agentes IA', href: '/agents', icon: '⚡' },
  { name: 'Relatórios', href: '/reports', icon: '📋' },
  { name: 'Clima', href: '/climate', icon: '🌡️' },
  { name: 'Talentos', href: '/talent', icon: '⭐' },
  { name: 'Base de Currículos', href: '/resumes', icon: '📄' },
  { name: 'Base de Conhecimento', href: '/knowledge-base', icon: '📚' },
  { name: 'Usuários', href: '/users', icon: '👤' },
  { name: 'Configurações', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">Nexus RH AI</h1>
        <p className="text-sm text-gray-400">Gestão Inteligente</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-primary-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="font-semibold">{user?.name?.slice(0, 2).toUpperCase() || 'TP'}</span>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name || 'Conta'}</p>
            <p className="text-xs text-gray-400">{user?.email || 'login pendente'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
