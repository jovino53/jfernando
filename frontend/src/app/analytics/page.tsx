'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const headcountData = [
  { month: 'Jan', count: 42 }, { month: 'Fev', count: 44 }, { month: 'Mar', count: 43 },
  { month: 'Abr', count: 46 }, { month: 'Mai', count: 48 }, { month: 'Jun', count: 47 },
  { month: 'Jul', count: 50 }, { month: 'Ago', count: 52 }, { month: 'Set', count: 51 },
  { month: 'Out', count: 53 }, { month: 'Nov', count: 55 }, { month: 'Dez', count: 54 },
];

const turnoverData = [
  { month: 'Jan', rate: 2.1 }, { month: 'Fev', rate: 1.8 }, { month: 'Mar', rate: 3.2 },
  { month: 'Abr', rate: 2.5 }, { month: 'Mai', rate: 1.5 }, { month: 'Jun', rate: 2.8 },
  { month: 'Jul', rate: 1.2 }, { month: 'Ago', rate: 2.0 }, { month: 'Set', rate: 1.9 },
  { month: 'Out', rate: 2.3 }, { month: 'Nov', rate: 1.7 }, { month: 'Dez', rate: 2.6 },
];

const departments = [
  { name: 'TI', count: 18, color: '#4f46e5' },
  { name: 'RH', count: 8, color: '#7c3aed' },
  { name: 'Financeiro', count: 10, color: '#059669' },
  { name: 'Marketing', count: 12, color: '#f59e0b' },
  { name: 'Operações', count: 15, color: '#ef4444' },
  { name: 'Vendas', count: 9, color: '#06b6d4' },
];

const salaryRanges = [
  { range: 'R$ 2-4k', ti: 2, rh: 1, fin: 2, mkt: 3, ops: 5, ven: 4 },
  { range: 'R$ 4-6k', ti: 4, rh: 2, fin: 3, mkt: 4, ops: 4, ven: 3 },
  { range: 'R$ 6-8k', ti: 5, rh: 2, fin: 3, mkt: 3, ops: 3, ven: 1 },
  { range: 'R$ 8-10k', ti: 4, rh: 2, fin: 1, mkt: 1, ops: 2, ven: 1 },
  { range: 'R$ 10-15k', ti: 2, rh: 1, fin: 1, mkt: 1, ops: 1, ven: 0 },
  { range: 'R$ 15k+', ti: 1, rh: 0, fin: 0, mkt: 0, ops: 0, ven: 0 },
];

const diversity = {
  gender: [
    { label: 'Masculino', value: 58, color: '#3b82f6' },
    { label: 'Feminino', value: 38, color: '#ec4899' },
    { label: 'Não-binário', value: 4, color: '#8b5cf6' },
  ],
  age: [
    { label: '18-25', value: 15 }, { label: '26-35', value: 35 },
    { label: '36-45', value: 28 }, { label: '46-55', value: 14 }, { label: '55+', value: 8 },
  ],
  ethnicity: [
    { label: 'Branco', value: 42, color: '#6b7280' },
    { label: 'Pardo', value: 28, color: '#d97706' },
    { label: 'Preto', value: 18, color: '#1f2937' },
    { label: 'Asiático', value: 7, color: '#059669' },
    { label: 'Indígena', value: 5, color: '#7c3aed' },
  ],
};

const performanceDistribution = [
  { range: '0-59', count: 3, label: 'Insuficiente' },
  { range: '60-69', count: 8, label: 'Regular' },
  { range: '70-79', count: 15, label: 'Bom' },
  { range: '80-89', count: 18, label: 'Muito Bom' },
  { range: '90-100', count: 10, label: 'Excelente' },
];

const engagementData = [
  { question: 'Satisfação com o trabalho', score: 4.2 },
  { question: 'Relacionamento com gestor', score: 4.0 },
  { question: 'Oportunidades de crescimento', score: 3.5 },
  { question: 'Remuneração e benefícios', score: 3.2 },
  { question: 'Ambiente de trabalho', score: 4.5 },
  { question: 'Comunicação interna', score: 3.8 },
  { question: 'Work-life balance', score: 3.9 },
  { question: 'Reconhecimento', score: 3.4 },
];

const recruitmentFunnel = [
  { stage: 'Candidaturas', count: 245, color: '#6366f1' },
  { stage: 'Triagem', count: 120, color: '#8b5cf6' },
  { stage: 'Entrevista RH', count: 65, color: '#a855f7' },
  { stage: 'Entrevista Técnica', count: 35, color: '#d946ef' },
  { stage: 'Proposta', count: 15, color: '#ec4899' },
  { stage: 'Contratado', count: 10, color: '#f43f5e' },
];

const turnoverReasons = [
  { reason: 'Melhor oportunidade', value: 32, color: '#ef4444' },
  { reason: 'Remuneração', value: 24, color: '#f59e0b' },
  { reason: 'Falta de crescimento', value: 18, color: '#8b5cf6' },
  { reason: 'Relacionamento', value: 12, color: '#06b6d4' },
  { reason: 'Desalinhamento', value: 8, color: '#6b7280' },
  { reason: 'Outros', value: 6, color: '#d1d5db' },
];

const absenteeism = [
  { month: 'Jan', days: 120 }, { month: 'Fev', days: 98 }, { month: 'Mar', days: 135 },
  { month: 'Abr', days: 110 }, { month: 'Mai', days: 88 }, { month: 'Jun', days: 142 },
  { month: 'Jul', days: 165 }, { month: 'Ago', days: 155 }, { month: 'Set', days: 105 },
  { month: 'Out', days: 95 }, { month: 'Nov', days: 112 }, { month: 'Dez', days: 130 },
];

const hireMetrics = {
  timeToHire: 28,
  costPerHire: 4200,
  offerAcceptance: 82,
  internalMobility: 15,
  avgTenure: 2.8,
  trainingInvestment: 1800,
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('12m');

  const maxHeadcount = Math.max(...headcountData.map((d) => d.count));
  const maxTurnover = Math.max(...turnoverData.map((d) => d.rate));
  const maxSalary = Math.max(...salaryRanges.flatMap((r) => [r.ti, r.rh, r.fin, r.mkt, r.ops, r.ven]));
  const maxAbsent = Math.max(...absenteeism.map((d) => d.days));
  const maxPerf = Math.max(...performanceDistribution.map((d) => d.count));
  const maxFunnel = recruitmentFunnel[0].count;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">People Analytics</h1>
              <p className="text-sm text-gray-500 mt-1">Insights estratégicos sobre capital humano</p>
            </div>
            <div className="flex gap-2">
              {['3m', '6m', '12m'].map((p) => (
                <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${period === p ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border'}`}>{p.toUpperCase()}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 mb-6">
            {[
              { label: 'Headcount', value: '54', sub: '+12% YoY', icon: '👥', color: 'text-blue-600' },
              { label: 'Turnover Anual', value: '18.5%', sub: '-3.2% vs去年', icon: '📉', color: 'text-green-600' },
              { label: 'Performance Média', value: '82.3', sub: '+4.1 pontos', icon: '⭐', color: 'text-purple-600' },
              { label: 'Engajamento', value: '3.8/5', sub: '+0.3 vs semestre', icon: '💪', color: 'text-amber-600' },
              { label: 'Time to Hire', value: '28 dias', sub: '-5 dias vs meta', icon: '⏱️', color: 'text-cyan-600' },
              { label: 'Custo por Hire', value: 'R$4.2k', sub: '-8% vs anterior', icon: '💰', color: 'text-emerald-600' },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{kpi.icon}</span>
                  <span className="text-xs text-gray-500">{kpi.label}</span>
                </div>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs text-gray-400 mt-1">{kpi.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Evolução de Headcount</h3>
              <div className="flex items-end gap-1 h-40">
                {headcountData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500 font-medium">{d.count}</span>
                    <div className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-600" style={{ height: `${(d.count / maxHeadcount) * 100}%` }}></div>
                    <span className="text-[9px] text-gray-400">{d.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span>Meta: 60 até Dez/2026</span>
                <span className="text-green-600">Progresso: 90%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Taxa de Turnover Mensal</h3>
              <div className="relative h-40">
                <div className="absolute inset-0 flex items-end">
                  {turnoverData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-gray-500 font-medium">{d.rate}%</span>
                      <div className="w-full rounded-t transition-all" style={{ height: `${(d.rate / maxTurnover) * 100}%`, backgroundColor: d.rate > 2.5 ? '#ef4444' : d.rate > 1.8 ? '#f59e0b' : '#10b981' }}></div>
                      <span className="text-[9px] text-gray-400">{d.month}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-0 left-0 right-0 border-t border-dashed border-red-300" style={{ bottom: `${((3 - 0) / maxTurnover) * 100}%` }}></div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> &lt;1.8% Bom</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span> 1.8-2.5% Atenção</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> &gt;2.5% Crítico</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Distribuição por Departamento</h3>
              <div className="space-y-3">
                {departments.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-20">{d.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                      <div className="h-5 rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${(d.count / Math.max(...departments.map((x) => x.count))) * 100}%`, backgroundColor: d.color }}>
                        <span className="text-[10px] text-white font-bold">{d.count}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{Math.round((d.count / 54) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Composição Salarial</h3>
              <div className="space-y-2">
                {salaryRanges.map((r) => (
                  <div key={r.range} className="flex items-center gap-1">
                    <span className="text-[10px] text-gray-500 w-16">{r.range}</span>
                    <div className="flex gap-0.5 flex-1">
                      {[
                        { val: r.ti, color: '#4f46e5' }, { val: r.rh, color: '#7c3aed' },
                        { val: r.fin, color: '#059669' }, { val: r.mkt, color: '#f59e0b' },
                        { val: r.ops, color: '#ef4444' }, { val: r.ven, color: '#06b6d4' },
                      ].map((dept, i) => (
                        <div key={i} className="h-4 rounded-sm" style={{ width: `${(dept.val / maxSalary) * 100}%`, backgroundColor: dept.color, opacity: dept.val > 0 ? 1 : 0.1 }}></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3 text-[9px] text-gray-400">
                {departments.map((d) => <span key={d.name} className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: d.color }}></span>{d.name}</span>)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Diversidade</h3>
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Gênero</p>
                <div className="flex gap-1 h-6 rounded-full overflow-hidden">
                  {diversity.gender.map((g) => (
                    <div key={g.label} className="flex items-center justify-center text-[9px] text-white font-bold" style={{ width: `${g.value}%`, backgroundColor: g.color }}>{g.value}%</div>
                  ))}
                </div>
                <div className="flex gap-3 mt-1.5">
                  {diversity.gender.map((g) => <span key={g.label} className="text-[9px] text-gray-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: g.color }}></span>{g.label}</span>)}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Idade</p>
                <div className="flex gap-1 h-5">
                  {diversity.age.map((a, i) => {
                    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
                    return <div key={a.label} className="flex flex-col items-center gap-0.5 flex-1">
                      <div className="w-full rounded-t" style={{ height: `${(a.value / 35) * 100}%`, backgroundColor: colors[i] }}></div>
                      <span className="text-[8px] text-gray-400">{a.label}</span>
                    </div>;
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Etnia</p>
                <div className="flex gap-1 h-5 rounded-full overflow-hidden">
                  {diversity.ethnicity.map((e) => (
                    <div key={e.label} className="h-full" style={{ width: `${e.value}%`, backgroundColor: e.color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {diversity.ethnicity.map((e) => <span key={e.label} className="text-[9px] text-gray-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }}></span>{e.label} {e.value}%</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Distribuição de Performance</h3>
              <div className="flex items-end gap-3 h-40">
                {performanceDistribution.map((p, i) => {
                  const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#059669'];
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-gray-500 font-bold">{p.count}</span>
                      <div className="w-full rounded-t transition-all" style={{ height: `${(p.count / maxPerf) * 100}%`, backgroundColor: colors[i] }}></div>
                      <span className="text-[9px] text-gray-400 text-center leading-tight">{p.range}<br/>{p.label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700"><strong>Insight IA:</strong> 52% dos colaboradores estão nos níveis "Muito Bom" e "Excelente". A distribuição está acima da média do mercado (75 vs 70).</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Scores de Engajamento</h3>
              <div className="space-y-2.5">
                {engagementData.map((e) => (
                  <div key={e.question} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-44 flex-shrink-0">{e.question}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div className="h-4 rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${(e.score / 5) * 100}%`, backgroundColor: e.score >= 4 ? '#10b981' : e.score >= 3.5 ? '#3b82f6' : '#f59e0b' }}>
                        <span className="text-[9px] text-white font-bold">{e.score}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-2 bg-amber-50 rounded-lg">
                <p className="text-xs text-amber-700"><strong>Atenção:</strong> "Remuneração" (3.2) e "Reconhecimento" (3.4) estão abaixo da média. Recomenda-se revisão salarial e programa de reconhecimento.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Funil de Recrutamento</h3>
              <div className="space-y-2">
                {recruitmentFunnel.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-500 w-20">{f.stage}</span>
                    <div className="flex-1 relative">
                      <div className="h-7 rounded transition-all flex items-center px-2" style={{ width: `${(f.count / maxFunnel) * 100}%`, backgroundColor: f.color }}>
                        <span className="text-[10px] text-white font-bold">{f.count}</span>
                      </div>
                    </div>
                    {i > 0 && <span className="text-[9px] text-gray-400 w-12 text-right">{Math.round((f.count / recruitmentFunnel[i - 1].count) * 100)}%</span>}
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded"><span className="text-gray-400">Conversão Total</span><br/><span className="font-bold text-gray-700">4.1%</span></div>
                <div className="bg-gray-50 p-2 rounded"><span className="text-gray-400">Lead Time</span><br/><span className="font-bold text-gray-700">28 dias</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Motivos de Turnover</h3>
              <div className="space-y-2.5">
                {turnoverReasons.map((r) => (
                  <div key={r.reason} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-32">{r.reason}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                      <div className="h-5 rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${(r.value / 32) * 100}%`, backgroundColor: r.color }}>
                        <span className="text-[10px] text-white font-bold">{r.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-2 bg-red-50 rounded-lg">
                <p className="text-xs text-red-700"><strong>Alerta:</strong> 56% dos desligamentos são por "Melhor oportunidade" e "Remuneração". Ação urgente necessária.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Absenteeísmo Mensal</h3>
              <div className="flex items-end gap-1 h-32">
                {absenteeism.map((a, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-gray-500">{a.days}</span>
                    <div className="w-full rounded-t transition-all" style={{ height: `${(a.days / maxAbsent) * 100}%`, backgroundColor: a.days > 140 ? '#ef4444' : a.days > 120 ? '#f59e0b' : '#10b981' }}></div>
                    <span className="text-[8px] text-gray-400">{a.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-center">
                <div className="bg-green-50 p-1.5 rounded"><span className="text-green-600 font-bold">95</span><br/><span className="text-[9px] text-gray-400">Mín</span></div>
                <div className="bg-blue-50 p-1.5 rounded"><span className="text-blue-600 font-bold">121</span><br/><span className="text-[9px] text-gray-400">Média</span></div>
                <div className="bg-red-50 p-1.5 rounded"><span className="text-red-600 font-bold">165</span><br/><span className="text-[9px] text-gray-400">Máx</span></div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="font-semibold text-indigo-800 mb-3">Insights Estratégicos — Gerados por IA</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-indigo-600 font-medium mb-1">Risco</p>
                <p className="text-sm text-gray-700">Turnover subiu em Março (3.2%) e Jun (2.8%) — correlacionado com ciclos de review salarial. Recomenda-se ajustes preventivos.</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-green-600 font-medium mb-1">Oportunidade</p>
                <p className="text-sm text-gray-700">52% da equipe em "Muito Bom" ou "Excelente" — programa de retenção com equity pode reduzir turnover em ~40%.</p>
              </div>
              <div className="bg-white/70 rounded-lg p-3">
                <p className="text-xs text-amber-600 font-medium mb-1">Ação</p>
                <p className="text-sm text-gray-700">Engajamento em "Remuneração" (3.2/5) e "Reconhecimento" (3.4/5) são os pilares mais fracos. Priorizar revisão salarial Q2.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
