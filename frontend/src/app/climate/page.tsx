'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const questions = [
  'Satisfação com o trabalho',
  'Relacionamento com gestor',
  'Oportunidades de crescimento',
  'Remuneração e benefícios',
  'Ambiente de trabalho',
  'Comunicação interna',
  'Work-life balance',
  'Reconhecimento',
  'Ferramentas e recursos',
  'Segurança psicológica',
];

const departments = ['TI', 'RH', 'Financeiro', 'Marketing', 'Operações', 'Vendas'];

const heatmapData = [
  [4.5, 4.2, 3.8, 3.2, 4.6, 3.9, 4.1, 3.5, 4.0, 4.3],
  [4.2, 4.5, 3.5, 3.0, 4.4, 4.0, 3.8, 3.2, 3.8, 4.1],
  [3.8, 3.9, 3.2, 3.5, 4.0, 3.5, 4.2, 3.0, 3.5, 3.8],
  [4.0, 4.1, 4.0, 2.8, 4.3, 3.7, 3.5, 3.8, 4.2, 4.0],
  [4.3, 3.8, 3.5, 3.3, 4.1, 3.6, 3.9, 3.4, 3.7, 3.9],
  [3.9, 4.0, 3.3, 2.9, 4.2, 3.8, 3.6, 3.1, 3.9, 3.7],
];

const monthlyScores = [
  { month: 'Jan', satisfaction: 3.9, engagement: 3.7, enps: 32 },
  { month: 'Fev', satisfaction: 4.0, engagement: 3.8, enps: 35 },
  { month: 'Mar', satisfaction: 3.8, engagement: 3.6, enps: 30 },
  { month: 'Abr', satisfaction: 4.1, engagement: 3.9, enps: 38 },
  { month: 'Mai', satisfaction: 4.0, engagement: 3.8, enps: 36 },
  { month: 'Jun', satisfaction: 4.2, engagement: 4.0, enps: 42 },
];

const pulseQuestions = [
  { question: 'Como você está se sentindo hoje?', emoji: '😊', options: ['Ótimo', 'Bom', 'Neutro', 'Ruim', 'Péssimo'], responses: [45, 32, 15, 6, 2] },
  { question: 'Você recomendaria a Nexus como lugar para trabalhar?', emoji: '💼', options: ['Definitivamente sim', 'Provavelmente sim', 'Neutro', 'Provavelmente não', 'Definitivamente não'], responses: [52, 28, 12, 5, 3] },
];

const drivers = [
  { driver: 'Propósito e missão', score: 4.5, trend: 'up', impact: 'Alto' },
  { driver: 'Relacionamento com colegas', score: 4.4, trend: 'up', impact: 'Alto' },
  { driver: 'Autonomia no trabalho', score: 4.3, trend: 'stable', impact: 'Alto' },
  { driver: 'Desenvolvimento profissional', score: 3.8, trend: 'up', impact: 'Alto' },
  { driver: 'Liderança', score: 4.1, trend: 'up', impact: 'Médio' },
  { driver: 'Remuneração', score: 3.2, trend: 'down', impact: 'Crítico' },
  { driver: 'Reconhecimento', score: 3.4, trend: 'down', impact: 'Crítico' },
  { driver: 'Comunicação', score: 3.8, trend: 'up', impact: 'Médio' },
  { driver: 'Work-life balance', score: 3.9, trend: 'stable', impact: 'Médio' },
  { driver: 'Ferramentas de trabalho', score: 3.7, trend: 'up', impact: 'Baixo' },
];

const surveys = [
  { id: 1, title: 'Pulse Check — Julho 2026', type: 'Pulse', responses: 48, total: 54, status: 'Ativa', deadline: '31/07/2026' },
  { id: 2, title: 'Pesquisa de Clima Q2 2026', type: 'Trimestral', responses: 52, total: 54, status: 'Concluída', deadline: '30/06/2026' },
  { id: 3, title: 'eNPS Mensal — Julho', type: 'Mensal', responses: 45, total: 54, status: 'Ativa', deadline: '28/07/2026' },
  { id: 4, title: 'Pesquisa de Engajamento 2026', type: 'Anual', responses: 0, total: 54, status: 'Agendada', deadline: '15/09/2026' },
];

const actionPlans = [
  { action: 'Revisão da política de remuneração', area: 'Compensação', responsible: 'Maria Santos', deadline: 'Q3 2026', priority: 'Alta', status: 'Em andamento' },
  { action: 'Programa de reconhecimento entre pares', area: 'Cultura', responsible: 'Juliana Mendes', deadline: 'Agosto 2026', priority: 'Alta', status: 'Planejado' },
  { action: 'Workshops de feedback para gestores', area: 'Liderança', responsible: 'Maria Santos', deadline: 'Q3 2026', priority: 'Média', status: 'Em andamento' },
  { action: 'Melhoria das ferramentas internas', area: 'TI', responsible: 'João Silva', deadline: 'Setembro 2026', priority: 'Média', status: 'Planejado' },
  { action: 'Flexible friday — dia de trabalho remoto', area: 'Política', responsible: 'Diretoria', deadline: 'Agosto 2026', priority: 'Baixa', status: 'Aprovado' },
];

const getHeatColor = (v: number) => {
  if (v >= 4.3) return 'bg-green-500 text-white';
  if (v >= 4.0) return 'bg-green-300 text-green-900';
  if (v >= 3.5) return 'bg-yellow-300 text-yellow-900';
  if (v >= 3.0) return 'bg-orange-300 text-orange-900';
  return 'bg-red-400 text-white';
};

export default function ClimatePage() {
  const [selectedSurvey, setSelectedSurvey] = useState<number | null>(null);
  const [pulseResponses, setPulseResponses] = useState<Record<number, number>>({});
  const [toast, setToast] = useState('');
  const [view, setView] = useState<'dashboard' | 'surveys' | 'heatmap' | 'actions'>('dashboard');
  const [showNewSurvey, setShowNewSurvey] = useState(false);
  const [showNewAction, setShowNewAction] = useState(false);
  type SurveyQuestionType = 'scale' | 'nps' | 'emoji' | 'text' | 'yes';
  type SurveyQuestion = { text: string; type: SurveyQuestionType; required: boolean };
  type NewSurvey = { title: string; type: string; target: string; deadline: string; anonymous: boolean; questions: SurveyQuestion[] };

  const [newSurvey, setNewSurvey] = useState<NewSurvey>({
    title: '', type: 'Pulse', target: 'Todos', deadline: '', anonymous: true,
    questions: [
      { text: '', type: 'scale', required: true },
    ],
  });
  const [newAction, setNewAction] = useState({
    title: '', area: 'Compensação', responsible: 'Maria Santos', deadline: '', priority: 'Alta', description: '',
    steps: [{ text: '', done: false }],
    kpis: [''],
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const avgScores = questions.map((_, qi) => {
    const avg = departments.reduce((sum, _, di) => sum + heatmapData[di][qi], 0) / departments.length;
    return Math.round(avg * 10) / 10;
  });

  const overallSatisfaction = 4.2;
  const overallEnps = 42;
  const responseRate = 89;

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
              <h1 className="text-2xl font-bold text-gray-900">Clima Organizacional</h1>
              <p className="text-sm text-gray-500 mt-1">Monitoramento contínuo do clima e engajamento</p>
            </div>
            <div className="flex gap-2">
              {([
                { key: 'dashboard', label: 'Dashboard', icon: '📊' },
                { key: 'surveys', label: 'Pesquisas', icon: '📋' },
                { key: 'heatmap', label: 'Heatmap', icon: '🗺️' },
                { key: 'actions', label: 'Planos de Ação', icon: '✅' },
              ] as const).map((t) => (
                <button key={t.key} onClick={() => setView(t.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${view === t.key ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border'}`}>{t.icon} {t.label}</button>
              ))}
            </div>
          </div>

          {view === 'dashboard' && (
            <>
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] text-gray-400 uppercase">Satisfação Geral</p>
                  <p className="text-3xl font-bold text-green-600">4.2<span className="text-lg">/5</span></p>
                  <p className="text-[10px] text-green-500 mt-1">↑ +0.3 vs semestre</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] text-gray-400 uppercase">eNPS</p>
                  <p className="text-3xl font-bold text-blue-600">+{overallEnps}</p>
                  <p className="text-[10px] text-green-500 mt-1">↑ +10 vs semestre</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] text-gray-400 uppercase">Taxa de Resposta</p>
                  <p className="text-3xl font-bold text-purple-600">{responseRate}%</p>
                  <p className="text-[10px] text-green-500 mt-1">↑ +17% vs Q1</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] text-gray-400 uppercase">Promotores</p>
                  <p className="text-3xl font-bold text-green-600">68%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Score 9-10</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] text-gray-400 uppercase">Detratores</p>
                  <p className="text-3xl font-bold text-red-500">8%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Score 0-6</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Evolução Mensal</h3>
                  <div className="flex items-end gap-2 h-40">
                    {monthlyScores.map((m, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-blue-600 font-bold">{m.enps}</span>
                        <div className="w-full rounded-t bg-blue-500 transition-all" style={{ height: `${(m.enps / 50) * 100}%` }}></div>
                        <span className="text-[9px] text-gray-400">{m.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-3 text-[10px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> eNPS</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Pulse Check — Hoje</h3>
                  <div className="space-y-4">
                    {pulseQuestions.map((pq, pi) => (
                      <div key={pi}>
                        <p className="text-sm font-medium text-gray-700 mb-2">{pq.emoji} {pq.question}</p>
                        <div className="flex gap-1">
                          {pq.responses.map((r, ri) => {
                            const total = pq.responses.reduce((a, b) => a + b, 0);
                            const pct = Math.round((r / total) * 100);
                            const colors = ['bg-green-500', 'bg-green-300', 'bg-yellow-300', 'bg-orange-300', 'bg-red-400'];
                            return (
                              <div key={ri} className="flex-1 relative group">
                                <div className={`${colors[ri]} rounded transition-all h-6 flex items-center justify-center`} style={{ width: '100%' }}>
                                  <span className="text-[9px] font-bold text-white">{pct}%</span>
                                </div>
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">{pq.options[ri]}: {r}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-between text-[8px] text-gray-400 mt-0.5">
                          <span>{pq.options[0]}</span><span>{pq.options[4]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Drivers de Engajamento</h3>
                <div className="grid grid-cols-2 gap-3">
                  {drivers.map((d) => (
                    <div key={d.driver} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-700">{d.driver}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${d.impact === 'Crítico' ? 'bg-red-100 text-red-700' : d.impact === 'Alto' ? 'bg-orange-100 text-orange-700' : d.impact === 'Médio' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>{d.impact}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1.5">
                          <div className="h-2 rounded-full transition-all" style={{ width: `${(d.score / 5) * 100}%`, backgroundColor: d.score >= 4.3 ? '#10b981' : d.score >= 3.8 ? '#3b82f6' : d.score >= 3.2 ? '#f59e0b' : '#ef4444' }}></div>
                        </div>
                      </div>
                      <span className={`text-lg font-bold ${d.score >= 4.3 ? 'text-green-600' : d.score >= 3.8 ? 'text-blue-600' : d.score >= 3.2 ? 'text-amber-600' : 'text-red-600'}`}>{d.score}</span>
                      <span className="text-sm">{d.trend === 'up' ? '📈' : d.trend === 'down' ? '📉' : '➡️'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h3 className="font-semibold text-green-800 mb-3">Insights da IA</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/70 rounded-xl p-4">
                    <p className="text-xs text-green-600 font-medium mb-1">✅ Pontos Fortes</p>
                    <p className="text-sm text-gray-700">Propósito (4.5) e colegas (4.4) são os maiores drivers. A cultura de equipe é um diferencial competitivo.</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4">
                    <p className="text-xs text-red-600 font-medium mb-1">⚠️ Atenção Urgente</p>
                    <p className="text-sm text-gray-700">Remuneração (3.2) e reconhecimento (3.4) estão em queda. 56% dos desligamentos citam esses fatores.</p>
                  </div>
                  <div className="bg-white/70 rounded-xl p-4">
                    <p className="text-xs text-blue-600 font-medium mb-1">💡 Recomendação</p>
                    <p className="text-sm text-gray-700">Implementar programa de reconhecimento entre pares pode elevar engajamento em ~15% com custo baixo.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {view === 'surveys' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Pesquisas de Clima</h3>
                <button onClick={() => setShowNewSurvey(true)} className="text-sm text-primary-600 hover:text-primary-800 font-medium px-4 py-2 bg-primary-50 rounded-xl">+ Nova Pesquisa</button>
              </div>
              {surveys.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.status === 'Ativa' ? 'bg-green-100' : s.status === 'Concluída' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {s.status === 'Ativa' ? '🟢' : s.status === 'Concluída' ? '✅' : '📅'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{s.title}</h4>
                        <p className="text-xs text-gray-500">{s.type} • Prazo: {s.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary-600">{s.responses}/{s.total}</p>
                        <p className="text-[10px] text-gray-400">respostas</p>
                      </div>
                      <div className="w-32">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-primary-500 h-3 rounded-full transition-all" style={{ width: `${(s.responses / s.total) * 100}%` }}></div>
                        </div>
                        <p className="text-[10px] text-gray-400 text-center mt-1">{Math.round((s.responses / s.total) * 100)}%</p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${s.status === 'Ativa' ? 'bg-green-100 text-green-700' : s.status === 'Concluída' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{s.status}</span>
                      <button onClick={() => setSelectedSurvey(selectedSurvey === s.id ? null : s.id)} className="text-sm text-primary-600 hover:text-primary-800 font-medium px-4 py-2 bg-primary-50 rounded-xl">
                        {selectedSurvey === s.id ? 'Fechar' : 'Ver Resultados'}
                      </button>
                    </div>
                  </div>
                  {selectedSurvey === s.id && (
                    <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-3">
                      <div className="bg-green-50 rounded-xl p-3 text-center"><p className="text-xl font-bold text-green-600">68%</p><p className="text-[10px] text-gray-500">Promotores</p></div>
                      <div className="bg-yellow-50 rounded-xl p-3 text-center"><p className="text-xl font-bold text-yellow-600">24%</p><p className="text-[10px] text-gray-500">Neutros</p></div>
                      <div className="bg-red-50 rounded-xl p-3 text-center"><p className="text-xl font-bold text-red-600">8%</p><p className="text-[10px] text-gray-500">Detratores</p></div>
                      <div className="bg-blue-50 rounded-xl p-3 text-center"><p className="text-xl font-bold text-blue-600">+42</p><p className="text-[10px] text-gray-500">eNPS Score</p></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {view === 'heatmap' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Heatmap de Satisfação</h3>
              <p className="text-xs text-gray-500 mb-4">Scores por departamento × pergunta (1-5)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-[10px] font-medium text-gray-500 uppercase bg-gray-50 sticky left-0">Departamento</th>
                      {questions.map((q) => <th key={q} className="px-2 py-2 text-center text-[9px] font-medium text-gray-500 uppercase bg-gray-50 min-w-[80px]">{q.split(' ').slice(0, 2).join(' ')}</th>)}
                      <th className="px-3 py-2 text-center text-[10px] font-medium text-gray-500 uppercase bg-gray-50">Média</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.map((dept, di) => {
                      const rowAvg = (heatmapData[di].reduce((a, b) => a + b, 0) / heatmapData[di].length).toFixed(1);
                      return (
                        <tr key={dept} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium text-gray-700 text-xs bg-white sticky left-0">{dept}</td>
                          {heatmapData[di].map((val, qi) => (
                            <td key={qi} className="px-1 py-1 text-center">
                              <div className={`rounded-lg py-1.5 text-xs font-bold ${getHeatColor(val)}`}>{val.toFixed(1)}</div>
                            </td>
                          ))}
                          <td className="px-3 py-2 text-center font-bold text-gray-700 text-xs">{rowAvg}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-50 font-bold">
                      <td className="px-3 py-2 text-xs text-gray-700 sticky left-0 bg-gray-50">Média Geral</td>
                      {avgScores.map((avg, qi) => (
                        <td key={qi} className="px-1 py-1 text-center">
                          <div className={`rounded-lg py-1.5 text-xs font-bold ${getHeatColor(avg)}`}>{avg.toFixed(1)}</div>
                        </td>
                      ))}
                      <td className="px-3 py-2 text-center text-xs text-gray-700">{(avgScores.reduce((a, b) => a + b, 0) / avgScores.length).toFixed(1)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3 mt-4 justify-center text-[10px]">
                <span className="flex items-center gap-1"><span className="w-4 h-3 bg-green-500 rounded"></span> ≥4.3 Excelente</span>
                <span className="flex items-center gap-1"><span className="w-4 h-3 bg-green-300 rounded"></span> 4.0-4.2 Bom</span>
                <span className="flex items-center gap-1"><span className="w-4 h-3 bg-yellow-300 rounded"></span> 3.5-3.9 Regular</span>
                <span className="flex items-center gap-1"><span className="w-4 h-3 bg-orange-300 rounded"></span> 3.0-3.4 Ruim</span>
                <span className="flex items-center gap-1"><span className="w-4 h-3 bg-red-400 rounded"></span> &lt;3.0 Crítico</span>
              </div>
            </div>
          )}

          {view === 'actions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Planos de Ação</h3>
                <button onClick={() => setShowNewAction(true)} className="text-sm text-primary-600 hover:text-primary-800 font-medium px-4 py-2 bg-primary-50 rounded-xl">+ Novo Plano</button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ação</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Área</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prazo</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridade</th>
                      <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {actionPlans.map((a, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-4 text-sm font-medium text-gray-900">{a.action}</td>
                        <td className="px-5 py-4 text-xs text-gray-500">{a.area}</td>
                        <td className="px-5 py-4 text-xs text-gray-500">{a.responsible}</td>
                        <td className="px-5 py-4 text-xs text-gray-500">{a.deadline}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${a.priority === 'Alta' ? 'bg-red-100 text-red-700' : a.priority === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>{a.priority}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${a.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' : a.status === 'Aprovado' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {showNewSurvey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Nova Pesquisa de Clima</h2>
                <p className="text-xs text-gray-500">Crie uma pesquisa personalizada para sua equipe</p>
              </div>
              <button onClick={() => setShowNewSurvey(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Nome da Pesquisa *</label>
                  <input type="text" value={newSurvey.title} onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })} placeholder="Ex: Pesquisa de Clima Q3 2026" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Tipo de Pesquisa</label>
                  <div className="flex gap-2">
                    {(['Pulse', 'Trimestral', 'Anual', 'Personalizada'] as const).map((t) => (
                      <button key={t} onClick={() => setNewSurvey({ ...newSurvey, type: t })}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${newSurvey.type === t ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Público-Alvo</label>
                  <select value={newSurvey.target} onChange={(e) => setNewSurvey({ ...newSurvey, target: e.target.value })} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Todos (54)</option>
                    <option>TI (18)</option>
                    <option>RH (8)</option>
                    <option>Financeiro (10)</option>
                    <option>Marketing (12)</option>
                    <option>Operações (15)</option>
                    <option>Vendas (9)</option>
                    <option>Gestores apenas (12)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Prazo</label>
                  <input type="date" value={newSurvey.deadline} onChange={(e) => setNewSurvey({ ...newSurvey, deadline: e.target.value })} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Anonimato</label>
                  <button onClick={() => setNewSurvey({ ...newSurvey, anonymous: !newSurvey.anonymous })}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition ${newSurvey.anonymous ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-gray-100 text-gray-600 border-2 border-gray-200'}`}>
                    {newSurvey.anonymous ? '🔒 Anônima' : '👤 Identificada'}
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Perguntas ({newSurvey.questions.length})</label>
                  <button onClick={() => setNewSurvey({ ...newSurvey, questions: [...newSurvey.questions, { text: '', type: 'scale', required: true }] })}
                    className="text-xs text-primary-600 hover:text-primary-800 font-medium">+ Adicionar Pergunta</button>
                </div>
                <div className="space-y-3">
                  {newSurvey.questions.map((q, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-7 h-7 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <select value={q.type} onChange={(e) => {
                          const qs = [...newSurvey.questions];
                          qs[i].type = e.target.value as any;
                          setNewSurvey({ ...newSurvey, questions: qs });
                        }} className="border rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option value="scale">Escala 1-5</option>
                          <option value="nps">eNPS (0-10)</option>
                          <option value="emoji">Emojis</option>
                          <option value="text">Aberta</option>
                          <option value="yes">Sim/Não</option>
                        </select>
                        <label className="flex items-center gap-1.5 text-xs text-gray-500 ml-auto">
                          <input type="checkbox" checked={q.required} onChange={(e) => {
                            const qs = [...newSurvey.questions];
                            qs[i].required = e.target.checked;
                            setNewSurvey({ ...newSurvey, questions: qs });
                          }} className="rounded" /> Obrigatória
                        </label>
                        {newSurvey.questions.length > 1 && (
                          <button onClick={() => setNewSurvey({ ...newSurvey, questions: newSurvey.questions.filter((_, qi) => qi !== i) })}
                            className="text-red-400 hover:text-red-600 text-sm">🗑️</button>
                        )}
                      </div>
                      <input type="text" value={q.text} onChange={(e) => {
                        const qs = [...newSurvey.questions];
                        qs[i].text = e.target.value;
                        setNewSurvey({ ...newSurvey, questions: qs });
                      }} placeholder={
                        q.type === 'scale' ? 'Ex: Como você avalia o ambiente de trabalho?' :
                        q.type === 'nps' ? 'Ex: Você recomendaria a Nexus como lugar para trabalhar?' :
                        q.type === 'emoji' ? 'Ex: Como você está se sentindo hoje?' :
                        q.type === 'yes' ? 'Ex: Você se sente valorizado na empresa?' :
                        'Ex: O que sugestões para melhorar o clima?'
                      } className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" />
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] text-gray-400">Preview:</span>
                        {q.type === 'scale' && <div className="flex gap-1">{[1,2,3,4,5].map((s) => <span key={s} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">{s}</span>)}</div>}
                        {q.type === 'nps' && <div className="flex gap-0.5">{[0,1,2,3,4,5,6,7,8,9,10].map((s) => <span key={s} className={`w-5 h-5 rounded flex items-center justify-center text-[8px] text-white ${s <= 6 ? 'bg-red-400' : s <= 8 ? 'bg-yellow-400' : 'bg-green-400'}`}>{s}</span>)}</div>}
                        {q.type === 'emoji' && <div className="flex gap-1">{['😢','😟','😐','😊','😍'].map((e,ei) => <span key={ei} className="text-lg cursor-pointer hover:scale-125 transition">{e}</span>)}</div>}
                        {q.type === 'yes' && <div className="flex gap-2"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Sim</span><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">Não</span></div>}
                        {q.type === 'text' && <span className="text-[10px] text-gray-400 italic">Campo de texto aberto...</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs text-blue-700 font-medium mb-1">💡 Dicas da IA</p>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Pesquisas com 5-10 perguntas têm taxa de conclusão 40% maior</li>
                  <li>• Perguntas anônimas geram respostas 25% mais honestas</li>
                  <li>• Incluir 1-2 perguntas abertas captura insights qualitativos</li>
                  <li>• Prazo de 7-10 dias úteis maximiza a taxa de resposta</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center p-5 border-t sticky bottom-0 bg-white">
              <div className="text-xs text-gray-400">
                {newSurvey.questions.filter((q) => q.text.trim()).length} de {newSurvey.questions.length} perguntas configuradas
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowNewSurvey(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium">Cancelar</button>
                <button onClick={() => {
                  if (!newSurvey.title.trim()) { showToast('Preencha o nome da pesquisa'); return; }
                  if (newSurvey.questions.some((q) => !q.text.trim())) { showToast('Preencha todas as perguntas'); return; }
                  setShowNewSurvey(false);
                  showToast(`Pesquisa "${newSurvey.title}" criada com ${newSurvey.questions.length} perguntas!`);
                  setNewSurvey({ title: '', type: 'Pulse', target: 'Todos', deadline: '', anonymous: true, questions: [{ text: '', type: 'scale', required: true }] });
                }} className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 text-sm font-medium flex items-center gap-2">
                  🚀 Criar e Enviar Pesquisa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Novo Plano de Ação</h2>
                <p className="text-xs text-gray-500">Defina ações concretas para melhorar o clima organizacional</p>
              </div>
              <button onClick={() => setShowNewAction(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Título da Ação *</label>
                <input type="text" value={newAction.title} onChange={(e) => setNewAction({ ...newAction, title: e.target.value })} placeholder="Ex: Programa de reconhecimento entre pares" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Descrição / Objetivo</label>
                <textarea value={newAction.description} onChange={(e) => setNewAction({ ...newAction, description: e.target.value })} placeholder="Descreva o objetivo desta ação e como ela impactará o clima..." rows={3} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Área</label>
                  <select value={newAction.area} onChange={(e) => setNewAction({ ...newAction, area: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    {['Compensação', 'Cultura', 'Liderança', 'TI', 'Política', 'Comunicação', 'Desenvolvimento', 'Ambiente'].map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Responsável</label>
                  <select value={newAction.responsible} onChange={(e) => setNewAction({ ...newAction, responsible: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    {['Maria Santos', 'João Silva', 'Juliana Mendes', 'Pedro Costa', 'Ana Oliveira', 'Carlos Souza', 'Fernanda Lima', 'Diretoria'].map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Prazo</label>
                  <input type="date" value={newAction.deadline} onChange={(e) => setNewAction({ ...newAction, deadline: e.target.value })} className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Prioridade</label>
                  <div className="flex gap-1.5">
                    {(['Alta', 'Média', 'Baixa'] as const).map((p) => (
                      <button key={p} onClick={() => setNewAction({ ...newAction, priority: p })}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition ${newAction.priority === p ? (p === 'Alta' ? 'bg-red-500 text-white' : p === 'Média' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-white') : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Etapas / Milestones ({newAction.steps.length})</label>
                  <button onClick={() => setNewAction({ ...newAction, steps: [...newAction.steps, { text: '', done: false }] })}
                    className="text-xs text-primary-600 hover:text-primary-800 font-medium">+ Adicionar Etapa</button>
                </div>
                <div className="space-y-2">
                  {newAction.steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                      <span className="w-7 h-7 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <input type="text" value={s.text} onChange={(e) => {
                        const steps = [...newAction.steps];
                        steps[i].text = e.target.value;
                        setNewAction({ ...newAction, steps });
                      }} placeholder={`Etapa ${i + 1}: Descreva o que precisa ser feito`} className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" />
                      {newAction.steps.length > 1 && (
                        <button onClick={() => setNewAction({ ...newAction, steps: newAction.steps.filter((_, si) => si !== i) })}
                          className="text-red-400 hover:text-red-600 text-sm">🗑️</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">KPIs de Sucesso</label>
                  <button onClick={() => setNewAction({ ...newAction, kpis: [...newAction.kpis, ''] })}
                    className="text-xs text-primary-600 hover:text-primary-800 font-medium">+ Adicionar KPI</button>
                </div>
                <div className="space-y-2">
                  {newAction.kpis.map((k, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded bg-green-100 text-green-600 flex items-center justify-center text-xs">📊</span>
                      <input type="text" value={k} onChange={(e) => {
                        const kpis = [...newAction.kpis];
                        kpis[i] = e.target.value;
                        setNewAction({ ...newAction, kpis });
                      }} placeholder="Ex: Aumentar engajamento em 15%" className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                      {newAction.kpis.length > 1 && (
                        <button onClick={() => setNewAction({ ...newAction, kpis: newAction.kpis.filter((_, ki) => ki !== i) })}
                          className="text-red-400 hover:text-red-600 text-sm">🗑️</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <p className="text-xs text-purple-700 font-medium mb-2">💡 Sugestões da IA baseadas no heatmap de clima:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Revisão salarial para áreas com score &lt;3.5',
                    'Programa de reconhecimento entre pares',
                    'Workshops de feedback para gestores',
                    'Flexible friday — trabalho remoto',
                    'Melhoria das ferramentas internas',
                    'Sessões de escuta ativa com a equipe',
                  ].map((s, i) => (
                    <button key={i} onClick={() => setNewAction({ ...newAction, title: s })}
                      className="text-left text-xs text-purple-600 bg-white/70 px-3 py-2 rounded-lg hover:bg-white transition">+ {s}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-5 border-t sticky bottom-0 bg-white">
              <div className="text-xs text-gray-400">
                {newAction.steps.filter((s) => s.text.trim()).length} etapas • {newAction.kpis.filter((k) => k.trim()).length} KPIs definidos
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowNewAction(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium">Cancelar</button>
                <button onClick={() => {
                  if (!newAction.title.trim()) { showToast('Preencha o título da ação'); return; }
                  setShowNewAction(false);
                  showToast(`Plano de ação "${newAction.title}" criado com sucesso!`);
                  setNewAction({ title: '', area: 'Compensação', responsible: 'Maria Santos', deadline: '', priority: 'Alta', description: '', steps: [{ text: '', done: false }], kpis: [''] });
                }} className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 text-sm font-medium flex items-center gap-2">
                  ✅ Criar Plano de Ação
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
