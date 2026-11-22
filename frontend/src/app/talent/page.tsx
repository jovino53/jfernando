'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const talentPipeline = [
  { stage: 'Candidaturas', count: 245, color: '#6366f1', icon: '📥' },
  { stage: 'Triagem', count: 120, color: '#8b5cf6', icon: '🔍' },
  { stage: 'Entrevista RH', count: 65, color: '#a855f7', icon: '💬' },
  { stage: 'Entrevista Técnica', count: 35, color: '#d946ef', icon: '🎯' },
  { stage: 'Proposta', count: 15, color: '#ec4899', icon: '📋' },
  { stage: 'Contratado', count: 10, color: '#f43f5e', icon: '✅' },
];

const nineBoxData = [
  { name: 'Maria Santos', dept: 'RH', perf: 95, pot: 95, x: 4, y: 4 },
  { name: 'Fernanda Lima', dept: 'TI', perf: 92, pot: 88, x: 4, y: 3 },
  { name: 'Ana Oliveira', dept: 'Marketing', perf: 94, pot: 90, x: 4, y: 4 },
  { name: 'João Silva', dept: 'TI', perf: 88, pot: 82, x: 3, y: 3 },
  { name: 'Juliana Mendes', dept: 'RH', perf: 85, pot: 78, x: 3, y: 3 },
  { name: 'Carlos Souza', dept: 'Marketing', perf: 82, pot: 65, x: 3, y: 2 },
  { name: 'Pedro Costa', dept: 'Financeiro', perf: 78, pot: 55, x: 2, y: 2 },
  { name: 'Ricardo Pereira', dept: 'Financeiro', perf: 65, pot: 30, x: 1, y: 1 },
];

const successionPlan = [
  { role: 'Diretora de Marketing', current: '—', successor1: 'Ana Oliveira', successor2: 'Carlos Souza', readiness: 85, timeline: '6-12 meses' },
  { role: 'Head de People Ops', current: '—', successor1: 'Maria Santos', successor2: 'Juliana Mendes', readiness: 92, timeline: '3-6 meses' },
  { role: 'Tech Lead', current: '—', successor1: 'Fernanda Lima', successor2: 'João Silva', readiness: 78, timeline: '12-18 meses' },
  { role: 'Gerente Financeiro', current: '—', successor1: 'Pedro Costa', successor2: '—', readiness: 45, timeline: '24 meses' },
  { role: 'Coordenador de RH', current: 'Juliana Mendes', successor1: '—', successor2: '—', readiness: 0, timeline: '—' },
];

const highPotentials = [
  { name: 'Maria Santos', dept: 'RH', score: 95, category: 'Estrela', growth: '+12%', risk: 'Baixo', icon: '⭐' },
  { name: 'Ana Oliveira', dept: 'Marketing', score: 90, category: 'Estrela', growth: '+15%', risk: 'Baixo', icon: '⭐' },
  { name: 'Fernanda Lima', dept: 'TI', score: 88, category: 'Alto Potencial', growth: '+10%', risk: 'Baixo', icon: '🌟' },
  { name: 'João Silva', dept: 'TI', score: 82, category: 'Alto Potencial', growth: '+8%', risk: 'Médio', icon: '🌟' },
  { name: 'Juliana Mendes', dept: 'RH', score: 78, category: 'Potencial', growth: '+6%', risk: 'Baixo', icon: '💫' },
];

const flightRisks = [
  { name: 'Ricardo Pereira', dept: 'Financeiro', risk: 75, reason: 'Falta de reconhecimento, salário abaixo do mercado', action: 'Reunião urgente com gestor', status: 'Em andamento' },
  { name: 'Pedro Costa', dept: 'Financeiro', risk: 45, reason: 'Falta de crescimento, poucas oportunidades', action: 'Plano de desenvolvimento', status: 'Planejado' },
  { name: 'Carlos Souza', dept: 'Marketing', risk: 40, reason: 'Busca novos desafios', action: 'Novo projeto desafiador', status: 'Concluído' },
  { name: 'João Silva', dept: 'TI', risk: 35, reason: 'Remuneração', action: 'Revisão salarial Q3', status: 'Em andamento' },
];

const careerPaths = [
  { employee: 'João Silva', current: 'Dev Pleno', path: ['Dev Senior', 'Tech Lead', 'Staff Engineer'], timeline: '3-5 anos', progress: 40 },
  { employee: 'Ana Oliveira', current: 'Coord. Marketing', path: ['Gerente Marketing', 'Diretora Marketing'], timeline: '2-3 anos', progress: 60 },
  { employee: 'Fernanda Lima', current: 'Dev Senior', path: ['Staff Engineer', 'Principal Engineer'], timeline: '2-4 anos', progress: 55 },
  { employee: 'Juliana Mendes', current: 'Analista RH', path: ['Coordenadora RH', 'Gerente RH'], timeline: '3-4 anos', progress: 45 },
  { employee: 'Pedro Costa', current: 'Analista Financeiro', path: ['Analista Senior', 'Coordenador Financeiro'], timeline: '4-6 anos', progress: 30 },
];

const skillGaps = [
  { skill: 'Liderança', needed: 8, have: 5, gap: 3, critical: true },
  { skill: 'Data Analytics', needed: 6, have: 3, gap: 3, critical: true },
  { skill: 'Cloud/AWS', needed: 5, have: 3, gap: 2, critical: false },
  { skill: 'UX Design', needed: 3, have: 2, gap: 1, critical: false },
  { skill: 'Gestão de Projetos', needed: 6, have: 4, gap: 2, critical: false },
  { skill: 'Comunicação Executiva', needed: 5, have: 2, gap: 3, critical: true },
];

const openPositions = [
  { id: 1, title: 'Desenvolvedor Full Stack', dept: 'TI', candidates: 24, priority: 'Alta', deadline: '15/08/2026', status: 'Em andamento' },
  { id: 2, title: 'Gerente de Projetos', dept: 'TI', candidates: 12, priority: 'Média', deadline: '30/08/2026', status: 'Em andamento' },
  { id: 3, title: 'Analista de RH', dept: 'RH', candidates: 8, priority: 'Baixa', deadline: '10/09/2026', status: 'Pausada' },
  { id: 4, title: 'Designer UX/UI', dept: 'Marketing', candidates: 18, priority: 'Alta', deadline: '20/08/2026', status: 'Em andamento' },
  { id: 5, title: 'Contador Senior', dept: 'Financeiro', candidates: 5, priority: 'Crítica', deadline: '05/08/2026', status: 'Urgente' },
];

const getRiskColor = (r: number) => r >= 60 ? 'text-red-600 bg-red-100' : r >= 40 ? 'text-yellow-600 bg-yellow-100' : 'text-green-600 bg-green-100';
const getReadinessColor = (r: number) => r >= 80 ? 'bg-green-500' : r >= 60 ? 'bg-blue-500' : r >= 40 ? 'bg-yellow-500' : 'bg-red-500';

export default function TalentPage() {
  const [view, setView] = useState<'pipeline' | '9box' | 'succession' | 'hipos' | 'risks' | 'careers' | 'gaps'>('pipeline');
  const [toast, setToast] = useState('');
  const [showNewPosition, setShowNewPosition] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {toast && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '1s' }}>
              <span className="text-xl">✅</span><p className="font-medium text-sm">{toast}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestão de Talentos</h1>
              <p className="text-sm text-gray-500 mt-1">Identifique, desenvolva e retenha os melhores talentos</p>
            </div>
            <button onClick={() => setShowNewPosition(true)} className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition">+ Nova Vaga</button>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-6">
            {[
              { label: 'Vagas Abertas', value: '5', icon: '🎯', color: 'text-blue-600' },
              { label: 'Candidatos', value: '67', icon: '👥', color: 'text-purple-600' },
              { label: 'HiPos', value: '5', icon: '⭐', color: 'text-amber-600' },
              { label: 'Flight Risks', value: '2', icon: '⚠️', color: 'text-red-600' },
              { label: 'Contratações Mês', value: '3', icon: '✅', color: 'text-green-600' },
            ].map((k) => (
              <div key={k.label} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-1"><span>{k.icon}</span><span className="text-[10px] text-gray-400 uppercase">{k.label}</span></div>
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm w-fit">
            {([
              { key: 'pipeline', label: 'Pipeline', icon: '🔄' },
              { key: '9box', label: '9-Box', icon: '📊' },
              { key: 'succession', label: 'Sucessão', icon: '👔' },
              { key: 'hipos', label: 'HiPos', icon: '⭐' },
              { key: 'risks', label: 'Flight Risks', icon: '⚠️' },
              { key: 'careers', label: 'Carreiras', icon: '🛤️' },
              { key: 'gaps', label: 'Skill Gaps', icon: '🎯' },
            ] as const).map((t) => (
              <button key={t.key} onClick={() => setView(t.key)}
                className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${view === t.key ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{t.icon} {t.label}</button>
            ))}
          </div>

          {view === 'pipeline' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Pipeline de Recrutamento</h3>
                <div className="flex items-end gap-2 h-48">
                  {talentPipeline.map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-sm font-bold text-gray-700">{s.count}</span>
                      <div className="w-full rounded-t transition-all flex items-center justify-center" style={{ height: `${(s.count / 245) * 100}%`, backgroundColor: s.color }}>
                        <span className="text-white text-xs font-bold">{s.icon}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 text-center">{s.stage}</span>
                      {i > 0 && <span className="text-[9px] text-gray-400">{Math.round((s.count / talentPipeline[i - 1].count) * 100)}%</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Vagas em Aberto</h3>
                <div className="space-y-3">
                  {openPositions.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3 hover:bg-gray-100 transition">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">{p.dept.slice(0, 2)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{p.title}</p>
                        <p className="text-[10px] text-gray-400">{p.dept} • Prazo: {p.deadline}</p>
                      </div>
                      <span className="text-xs text-gray-500">{p.candidates} candidatos</span>
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${p.priority === 'Crítica' ? 'bg-red-100 text-red-700 animate-pulse' : p.priority === 'Alta' ? 'bg-orange-100 text-orange-700' : p.priority === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>{p.priority}</span>
                      <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${p.status === 'Urgente' ? 'bg-red-100 text-red-700' : p.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === '9box' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-2">9-Box Grid — Performance × Potencial</h3>
              <p className="text-xs text-gray-500 mb-4">Clique nos colaboradores para ver detalhes</p>
              <div className="grid grid-cols-3 gap-1 max-w-2xl mx-auto">
                {[
                  { label: 'Estrelas', color: 'bg-green-100 border-green-300', textColor: 'text-green-800', desc: 'Alto perf + Alto potencial' },
                  { label: 'Alto Potencial', color: 'bg-blue-100 border-blue-300', textColor: 'text-blue-800', desc: 'Baixo perf + Alto potencial' },
                  { label: 'Contradicções', color: 'bg-yellow-100 border-yellow-300', textColor: 'text-yellow-800', desc: 'Alto perf + Baixo potencial' },
                  { label: 'Profissionais Sólidos', color: 'bg-purple-100 border-purple-300', textColor: 'text-purple-800', desc: 'Médio perf + Médio potencial' },
                  { label: 'Core', color: 'bg-gray-100 border-gray-300', textColor: 'text-gray-800', desc: 'Médio perf + Médio potencial' },
                  { label: 'Problema', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', desc: 'Médio perf + Baixo potencial' },
                  { label: 'Expertise', color: 'bg-indigo-100 border-indigo-300', textColor: 'text-indigo-800', desc: 'Baixo perf + Alto potencial' },
                  { label: 'Questão', color: 'bg-red-100 border-red-300', textColor: 'text-red-800', desc: 'Baixo perf + Baixo potencial' },
                  { label: 'Desinvestir', color: 'bg-red-50 border-red-200', textColor: 'text-red-600', desc: 'Baixo perf + Baixo potencial' },
                ].map((cell, i) => {
                  const y = Math.floor(i / 3);
                  const x = i % 3;
                  const people = nineBoxData.filter((p) => {
                    const perfLevel = p.perf >= 90 ? 2 : p.perf >= 75 ? 1 : 0;
                    const potLevel = p.pot >= 80 ? 2 : p.pot >= 60 ? 1 : 0;
                    return perfLevel === (2 - x) && potLevel === (2 - y);
                  });
                  return (
                    <div key={i} className={`border-2 rounded-xl p-3 min-h-[120px] ${cell.color} transition hover:shadow-md`}>
                      <p className={`text-xs font-bold ${cell.textColor} mb-1`}>{cell.label}</p>
                      <p className="text-[9px] text-gray-500 mb-2">{cell.desc}</p>
                      <div className="space-y-1">
                        {people.map((p) => (
                          <div key={p.name} className="bg-white/80 rounded-lg px-2 py-1 text-[10px] font-medium text-gray-700 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.perf >= 90 ? '#10b981' : p.perf >= 75 ? '#3b82f6' : '#f59e0b' }}></span>
                            {p.name.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-6 mt-4 text-[10px] text-gray-500">
                <span>← Performance Baixa | Média | Alta →</span>
                <span>↑ Potencial Alto | Médio | Baixo ↓</span>
              </div>
            </div>
          )}

          {view === 'succession' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b"><h3 className="font-semibold text-gray-800">Mapa de Sucessão</h3></div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cargo</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sucessor 1</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sucessor 2</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Readiness</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {successionPlan.map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{s.role}</td>
                      <td className="px-5 py-4 text-sm text-gray-700">{s.successor1 || '—'}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{s.successor2 || '—'}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${getReadinessColor(s.readiness)}`} style={{ width: `${s.readiness}%` }}></div></div>
                          <span className="text-xs font-medium text-gray-600">{s.readiness}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500">{s.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === 'hipos' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-100 mb-4">
                <p className="text-sm text-amber-800"><strong>Alto Potenciais (HiPos)</strong> — colaboradores com maior potencial de liderança e impacto. Estes são os candidatos a papéis estratégicos nos próximos 12-24 meses.</p>
              </div>
              {highPotentials.map((h, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition">
                  <div className="text-3xl">{h.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{h.name}</h4>
                    <p className="text-xs text-gray-500">{h.dept} • Score: {h.score}/100</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{h.growth}</p>
                    <p className="text-[10px] text-gray-400">Crescimento</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${h.risk === 'Baixo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>Risco: {h.risk}</span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-700">{h.category}</span>
                </div>
              ))}
            </div>
          )}

          {view === 'risks' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-5 border border-red-100 mb-4">
                <p className="text-sm text-red-800"><strong>Flight Risks</strong> — colaboradores com alta probabilidade de desligamento. Ação imediata necessária para retenção.</p>
              </div>
              {flightRisks.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold" style={{ backgroundColor: r.risk >= 60 ? '#fef2f2' : '#fffbeb', color: r.risk >= 60 ? '#dc2626' : '#d97706' }}>{r.risk}%</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{r.name}</h4>
                      <p className="text-xs text-gray-500">{r.dept}</p>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getRiskColor(r.risk)}`}>Risco {r.risk >= 60 ? 'Alto' : 'Médio'}</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <p className="text-xs text-gray-500 mb-1">Motivos identificados:</p>
                    <p className="text-sm text-gray-700">{r.reason}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Ação: <strong className="text-gray-700">{r.action}</strong></span>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${r.status === 'Concluído' ? 'bg-green-100 text-green-700' : r.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{r.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === 'careers' && (
            <div className="space-y-4">
              {careerPaths.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">{c.employee.split(' ').map((n) => n[0]).join('')}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{c.employee}</h4>
                      <p className="text-xs text-gray-500">Atual: <strong>{c.current}</strong> • Progresso: {c.progress}%</p>
                    </div>
                    <span className="text-xs text-gray-400">⏱ {c.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium">{c.current}</div>
                    {c.path.map((step, si) => (
                      <div key={si} className="flex items-center gap-2">
                        <span className="text-gray-300">→</span>
                        <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${si < Math.floor(c.progress / 33) ? 'bg-green-100 text-green-700' : si === Math.floor(c.progress / 33) ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-300' : 'bg-gray-100 text-gray-500'}`}>{step}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2"><div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${c.progress}%` }}></div></div>
                </div>
              ))}
            </div>
          )}

          {view === 'gaps' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Análise de Gaps de Skills</h3>
              <p className="text-xs text-gray-500 mb-4">Competências necessárias vs disponíveis no time</p>
              <div className="space-y-4">
                {skillGaps.map((g, i) => (
                  <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3">
                    <div className="w-32">
                      <p className="text-sm font-medium text-gray-700">{g.skill}</p>
                      {g.critical && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">Crítico</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                          <div className="bg-green-500 h-4 rounded-l-full" style={{ width: `${(g.have / g.needed) * 100}%` }}></div>
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{g.have}/{g.needed}</div>
                        </div>
                        <span className="text-xs text-gray-500 w-16 text-right">{Math.round((g.have / g.needed) * 100)}%</span>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${g.gap >= 3 ? 'bg-red-100 text-red-700' : g.gap >= 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>Gap: {g.gap}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 rounded-xl p-4">
                <p className="text-xs text-blue-700 font-medium mb-1">💡 Recomendações da IA:</p>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Programa de mentoria para Leadership (gap crítico)</li>
                  <li>• Contratação externa para Data Analytics (3 vagas)</li>
                  <li>• Workshop de Comunicação Executiva para gestores</li>
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>

      {showNewPosition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-gray-900">Nova Vaga</h2>
              <button onClick={() => setShowNewPosition(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Título da Vaga *</label><input type="text" placeholder="Ex: Desenvolvedor Full Stack" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Departamento</label><select className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"><option>TI</option><option>RH</option><option>Financeiro</option><option>Marketing</option><option>Operações</option><option>Vendas</option></select></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Prioridade</label><select className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"><option>Crítica</option><option>Alta</option><option>Média</option><option>Baixa</option></select></div>
              </div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Prazo</label><input type="date" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Descrição</label><textarea rows={3} placeholder="Descreva os requisitos e responsabilidades..." className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" /></div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button onClick={() => setShowNewPosition(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium">Cancelar</button>
              <button onClick={() => { setShowNewPosition(false); showToast('Vaga criada com sucesso!'); }} className="px-5 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 text-sm font-medium">Criar Vaga</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
