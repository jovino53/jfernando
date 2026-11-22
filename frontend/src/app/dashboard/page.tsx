'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Target, Smile, Briefcase, AlertTriangle, CheckCircle, Clock, Star, ChevronRight, Zap, Bell, FileText, DollarSign, Timer, Award, Activity, ShieldCheck, BookOpen, UsersRound, BarChart3, Calendar, UserCheck, FileCheck, Building2, Brain } from 'lucide-react';

const headcountData = [
  { month: 'Jan', total: 310, admissions: 15, departures: 8 },
  { month: 'Fev', total: 317, admissions: 12, departures: 5 },
  { month: 'Mar', total: 324, admissions: 18, departures: 11 },
  { month: 'Abr', total: 331, admissions: 14, departures: 7 },
  { month: 'Mai', total: 338, admissions: 16, departures: 9 },
  { month: 'Jun', total: 345, admissions: 19, departures: 12 },
  { month: 'Jul', total: 352, admissions: 21, departures: 14 },
];

const departmentData = [
  { name: 'Tecnologia', value: 120, color: '#6366f1' },
  { name: 'RH', value: 45, color: '#8b5cf6' },
  { name: 'Marketing', value: 38, color: '#a855f7' },
  { name: 'Financeiro', value: 32, color: '#d946ef' },
  { name: 'Operacoes', value: 65, color: '#ec4899' },
  { name: 'Vendas', value: 40, color: '#f43f5e' },
];

const performanceData = [
  { month: 'Jan', score: 7.8, goal: 8.0 },
  { month: 'Fev', score: 7.9, goal: 8.0 },
  { month: 'Mar', score: 8.1, goal: 8.2 },
  { month: 'Abr', score: 8.0, goal: 8.2 },
  { month: 'Mai', score: 8.3, goal: 8.4 },
  { month: 'Jun', score: 8.4, goal: 8.4 },
  { month: 'Jul', score: 8.5, goal: 8.6 },
];

const turnoverData = [
  { month: 'Jan', rate: 3.2, absent: 4.2 },
  { month: 'Fev', rate: 2.8, absent: 3.8 },
  { month: 'Mar', rate: 3.5, absent: 4.5 },
  { month: 'Abr', rate: 2.9, absent: 3.5 },
  { month: 'Mai', rate: 3.1, absent: 3.2 },
  { month: 'Jun', rate: 2.7, absent: 2.9 },
  { month: 'Jul', rate: 2.5, absent: 2.7 },
];

const hiringFunnel = [
  { stage: 'Candidaturas', count: 245, color: '#6366f1' },
  { stage: 'Triagem', count: 120, color: '#8b5cf6' },
  { stage: 'Entrevista', count: 65, color: '#a855f7' },
  { stage: 'Proposta', count: 15, color: '#ec4899' },
  { stage: 'Contratado', count: 10, color: '#10b981' },
];

const topPerformers = [
  { name: 'Maria Santos', dept: 'RH', score: 9.8, trend: '+0.3' },
  { name: 'Ana Oliveira', dept: 'Marketing', score: 9.6, trend: '+0.2' },
  { name: 'Fernanda Lima', dept: 'TI', score: 9.4, trend: '+0.4' },
  { name: 'Joao Silva', dept: 'TI', score: 9.2, trend: '+0.1' },
];

const birthdayPeople = [
  { name: 'Carlos Souza', dept: 'Marketing', date: '28/07', days: 1 },
  { name: 'Pedro Costa', dept: 'Financeiro', date: '30/07', days: 3 },
  { name: 'Juliana Mendes', dept: 'RH', date: '02/08', days: 6 },
];

const recentCandidates = [
  { name: 'Lucas Ferreira', position: 'Dev Full Stack', status: 'INTERVIEW' },
  { name: 'Mariana Costa', position: 'Gerente Projetos', status: 'OFFER' },
  { name: 'Thiago Mendes', position: 'Eng. DevOps', status: 'SCREENING' },
];

const pendingApprovals = [
  { type: 'Ferias', employee: 'Joao Silva', detail: '15/08 a 30/08', priority: 'media' },
  { type: 'Aquisicao', employee: 'Ana Oliveira', detail: 'Monitor Dell 27"', priority: 'alta' },
  { type: 'Horas Extras', employee: 'Pedro Costa', detail: '12h no mes', priority: 'baixa' },
];

const onboardingPending = [
  { name: 'Lucas Ferreira', start: '01/08', dept: 'TI', step: 'Documento' },
  { name: 'Mariana Costa', start: '05/08', dept: 'RH', step: 'EPI' },
  { name: 'Thiago Mendes', start: '10/08', dept: 'TI', step: 'Equipamento' },
];

const trainingStatus = [
  { name: 'Lideranca 360', enrolled: 24, completed: 18, pending: 6 },
  { name: 'Comunicacao Assertiva', enrolled: 35, completed: 35, pending: 0 },
  { name: 'Seguranca da Informacao', enrolled: 340, completed: 280, pending: 60 },
  { name: 'Diversidade e Inclusao', enrolled: 120, completed: 45, pending: 75 },
];

const teamPerformance = [
  { name: 'Maria Santos', team: 'RH', score: 9.5, attendance: 98, goals: 92 },
  { name: 'Fernanda Lima', team: 'TI', score: 9.2, attendance: 96, goals: 88 },
  { name: 'Carlos Souza', team: 'Marketing', score: 7.8, attendance: 94, goals: 75 },
  { name: 'Pedro Costa', team: 'Financeiro', score: 7.2, attendance: 91, goals: 70 },
];

const teamRisks = [
  { name: 'Ricardo Pereira', dept: 'Financeiro', risk: 75, reason: 'Salario abaixo do mercado' },
  { name: 'Pedro Costa', dept: 'Financeiro', risk: 45, reason: 'Falta de crescimento' },
];

const diversityData = [
  { category: 'Genero', items: [{ label: 'Homens', value: 55, color: '#6366f1' }, { label: 'Mulheres', value: 42, color: '#ec4899' }, { label: 'Outros', value: 3, color: '#10b981' }] },
  { category: 'Idade', items: [{ label: '18-30', value: 35, color: '#6366f1' }, { label: '31-45', value: 45, color: '#8b5cf6' }, { label: '46-60', value: 18, color: '#d946ef' }, { label: '60+', value: 2, color: '#ec4899' }] },
];

const costData = [
  { month: 'Jan', cost: 7800 },
  { month: 'Fev', cost: 7900 },
  { month: 'Mar', cost: 8100 },
  { month: 'Abr', cost: 8000 },
  { month: 'Mai', cost: 8200 },
  { month: 'Jun', cost: 8150 },
  { month: 'Jul', cost: 8200 },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  APPLIED: { label: 'Candidatura', color: 'text-blue-700', bg: 'bg-blue-100' },
  SCREENING: { label: 'Triagem', color: 'text-purple-700', bg: 'bg-purple-100' },
  INTERVIEW: { label: 'Entrevista', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  OFFER: { label: 'Proposta', color: 'text-cyan-700', bg: 'bg-cyan-100' },
  HIRED: { label: 'Contratado', color: 'text-green-700', bg: 'bg-green-100' },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'hr' | 'manager' | 'director'>('all');
  const [toast, setToast] = useState('');
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Bom dia' : now.getHours() < 18 ? 'Boa tarde' : 'Boa noite';
  const dateStr = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {toast && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '1s' }}>
              <CheckCircle size={20} /><p className="font-medium text-sm">{toast}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{greeting}, Admin!</h1>
              <p className="text-sm text-gray-500 mt-1 capitalize">{dateStr}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2">
                <FileText size={16} /> Exportar PDF
              </button>
              <button onClick={() => showToast('Dados atualizados!')} className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2">
                <Activity size={16} /> Atualizar
              </button>
            </div>
          </div>

          <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm w-fit">
            {([
              { key: 'all' as const, label: 'Visao Geral', icon: '📊' },
              { key: 'hr' as const, label: 'RH', icon: '👥' },
              { key: 'manager' as const, label: 'Gestores', icon: '🎯' },
              { key: 'director' as const, label: 'Diretoria', icon: '📈' },
            ]).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition ${activeTab === tab.key ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'all' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
                {[
                  { label: 'Colaboradores', value: '345', change: '+12%', positive: true, icon: <Users size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Retencao', value: '91.5%', change: '+2.3%', positive: true, icon: <Target size={18} />, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Satisfacao', value: '8.5/10', change: '+0.4', positive: true, icon: <Smile size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Vagas Abertas', value: '18', change: '-3', positive: false, icon: <Briefcase size={18} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Absentismo', value: '2.7%', change: '-0.5%', positive: true, icon: <Timer size={18} />, color: 'text-red-600', bg: 'bg-red-50' },
                  { label: 'Custo/Func.', value: 'R$ 8.2k', change: '+3%', positive: false, icon: <DollarSign size={18} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { label: 'Tempo Contrat.', value: '23 dias', change: '-4', positive: true, icon: <Clock size={18} />, color: 'text-teal-600', bg: 'bg-teal-50' },
                  { label: 'HiPos', value: '5', change: '+1', positive: true, icon: <Award size={18} />, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className={`w-8 h-8 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center mb-2`}>{kpi.icon}</div>
                    <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-[10px] text-gray-400 uppercase">{kpi.label}</p>
                    <p className={`text-[10px] mt-1 flex items-center gap-0.5 ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {kpi.change} vs mes anterior
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { message: '3 avaliacoes pendentes', icon: <AlertTriangle size={16} />, color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
                  { message: 'Pesquisa de clima aberta', icon: <Bell size={16} />, color: 'bg-blue-50 border-blue-200 text-blue-800' },
                  { message: 'Meta de retencao atingida', icon: <CheckCircle size={16} />, color: 'bg-green-50 border-green-200 text-green-800' },
                  { message: '2 flight risks identificados', icon: <AlertTriangle size={16} />, color: 'bg-red-50 border-red-200 text-red-800' },
                ].map((alert, i) => (
                  <div key={i} className={`rounded-xl p-3 flex items-center gap-3 border ${alert.color} cursor-pointer hover:shadow-sm transition`}>
                    {alert.icon}<p className="text-sm font-medium flex-1">{alert.message}</p><ChevronRight size={16} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Evolucao do Quadro</h3>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1"><TrendingUp size={12} /> +42 este mes</span>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={headcountData}>
                      <defs><linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} fill="url(#colorTotal)" name="Total" />
                      <Line type="monotone" dataKey="admissions" stroke="#10b981" strokeWidth={2} name="Admissoes" dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="departures" stroke="#f43f5e" strokeWidth={2} name="Desligamentos" dot={{ r: 3 }} />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Por Depto</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart><Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">{departmentData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-1 mt-2">{departmentData.map((d, i) => <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-600"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>{d.name} ({d.value})</div>)}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-2xl shadow-sm p-6"><h3 className="font-semibold text-gray-800 mb-4">Performance vs Meta</h3><ResponsiveContainer width="100%" height={200}><BarChart data={performanceData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis domain={[7, 9]} tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="score" fill="#6366f1" name="Pontuacao" radius={[4, 4, 0, 0]} /><Bar dataKey="goal" fill="#e5e7eb" name="Meta" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
                <div className="bg-white rounded-2xl shadow-sm p-6"><h3 className="font-semibold text-gray-800 mb-4">Turnover e Absentismo</h3><ResponsiveContainer width="100%" height={200}><LineChart data={turnoverData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis domain={[0, 6]} tick={{ fontSize: 10 }} /><Tooltip /><Line type="monotone" dataKey="rate" stroke="#f43f5e" strokeWidth={2} name="Turnover %" dot={{ r: 3 }} /><Line type="monotone" dataKey="absent" stroke="#f97316" strokeWidth={2} name="Absentismo %" dot={{ r: 3 }} strokeDasharray="5 5" /><Legend /></LineChart></ResponsiveContainer></div>
                <div className="bg-white rounded-2xl shadow-sm p-6"><h3 className="font-semibold text-gray-800 mb-4">Funil de Contratacao</h3><div className="space-y-2">{hiringFunnel.map((s, i) => <div key={i} className="flex items-center gap-3"><span className="text-[10px] text-gray-500 w-20 text-right">{s.stage}</span><div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden"><div className="h-6 rounded-full flex items-center justify-end pr-2" style={{ width: `${(s.count / 245) * 100}%`, backgroundColor: s.color }}><span className="text-[10px] font-bold text-white">{s.count}</span></div></div></div>)}</div><div className="mt-3 text-center"><span className="text-xs text-gray-500">Conversao: </span><span className="text-xs font-bold text-green-600">4.1%</span></div></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800 text-sm">Top Performers</h3><Link href="/intelligence" className="text-xs text-primary-600">Ver todos</Link></div>
                  <div className="space-y-3">{topPerformers.map((p, i) => <div key={i} className="flex items-center gap-3"><span className="text-lg">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '⭐'}</span><div className="flex-1"><p className="text-sm font-medium text-gray-800">{p.name}</p><p className="text-[10px] text-gray-400">{p.dept}</p></div><div className="text-right"><p className="text-sm font-bold text-primary-600">{p.score}</p><p className="text-[10px] text-green-600">{p.trend}</p></div></div>)}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800 text-sm">Aniversariantes</h3></div>
                  <div className="space-y-3">{birthdayPeople.map((b, i) => <div key={i} className="flex items-center gap-3 bg-pink-50 rounded-xl px-3 py-2"><div className="w-9 h-9 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center font-bold text-xs">{b.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div><div className="flex-1"><p className="text-sm font-medium text-gray-800">{b.name}</p><p className="text-[10px] text-gray-400">{b.dept}</p></div><div className="text-right"><p className="text-xs font-bold text-pink-600">{b.date}</p><p className="text-[10px] text-gray-400">{b.days === 1 ? 'Amanha' : `Em ${b.days} dias`}</p></div></div>)}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800 text-sm">Candidaturas</h3><Link href="/resumes" className="text-xs text-primary-600">Ver todas</Link></div>
                  <div className="space-y-3">{recentCandidates.map((c, i) => <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2 hover:bg-gray-100 transition cursor-pointer"><div className="w-9 h-9 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div><div className="flex-1"><p className="text-sm font-medium text-gray-800">{c.name}</p><p className="text-[10px] text-gray-400">{c.position}</p></div><span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${statusConfig[c.status]?.bg} ${statusConfig[c.status]?.color}`}>{statusConfig[c.status]?.label}</span></div>)}</div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800 text-sm">Pendencias</h3><span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">3</span></div>
                  <div className="space-y-3">{pendingApprovals.map((a, i) => <div key={i} className="bg-gray-50 rounded-xl px-3 py-2 hover:bg-gray-100 transition cursor-pointer"><div className="flex items-center justify-between mb-1"><span className="text-xs font-medium text-gray-800">{a.type}</span><span className={`text-[9px] px-1.5 py-0.5 rounded-full ${a.priority === 'alta' ? 'bg-red-100 text-red-700' : a.priority === 'media' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'}`}>{a.priority}</span></div><p className="text-[10px] text-gray-500">{a.employee} - {a.detail}</p></div>)}</div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'hr' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
                {[
                  { label: 'Documentos Pendentes', value: '12', icon: <FileCheck size={18} />, color: 'text-red-600', bg: 'bg-red-50' },
                  { label: 'Onboarding', value: '3', icon: <UserCheck size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Treinandos Ativos', value: '4', icon: <BookOpen size={18} />, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Ferias Pendentes', value: '8', icon: <Calendar size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'ASOs a Vencer', value: '5', icon: <ShieldCheck size={18} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Reclamacoes', value: '2', icon: <UsersRound size={18} />, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-3`}>{kpi.icon}</div>
                    <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><UserCheck size={18} className="text-blue-600" /> Onboarding Pendente</h3>
                  <div className="space-y-3">
                    {onboardingPending.map((o, i) => (
                      <div key={i} className="flex items-center gap-4 bg-blue-50 rounded-xl px-4 py-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">{o.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                        <div className="flex-1"><p className="text-sm font-medium text-gray-800">{o.name}</p><p className="text-[10px] text-gray-500">{o.dept} - Inicio: {o.start}</p></div>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{o.step}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/employees" className="block mt-3 text-center text-xs text-primary-600 hover:text-primary-700">Ver todos os colaboradores</Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><BookOpen size={18} className="text-green-600" /> Status de Treinamentos</h3>
                  <div className="space-y-4">
                    {trainingStatus.map((t, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{t.name}</span>
                          <span className="text-xs text-gray-500">{t.completed}/{t.enrolled}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 relative">
                          <div className="h-3 rounded-full transition-all" style={{ width: `${(t.completed / t.enrolled) * 100}%`, backgroundColor: t.completed === t.enrolled ? '#10b981' : '#6366f1' }}></div>
                        </div>
                        {t.pending > 0 && <p className="text-[10px] text-amber-600 mt-1">{t.pending} pendentes</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><FileCheck size={18} className="text-red-600" /> Documentos Pendentes por Colaborador</h3>
                <table className="w-full">
                  <thead className="bg-gray-50"><tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Colaborador</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Documento</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Prazo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  </tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { name: 'Joao Silva', doc: 'RG/CNH', deadline: '30/07', urgent: true },
                      { name: 'Ana Oliveira', doc: 'Comprovante Residencia', deadline: '05/08', urgent: false },
                      { name: 'Pedro Costa', doc: 'ASO Medico', deadline: '10/08', urgent: false },
                      { name: 'Maria Santos', doc: 'Certificado CRM', deadline: '15/08', urgent: false },
                    ].map((d, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{d.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{d.doc}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{d.deadline}</td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${d.urgent ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{d.urgent ? 'Urgente' : 'Pendente'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div><h3 className="text-lg font-bold mb-1">Compliance LGPD</h3><p className="text-blue-100 text-sm">Status de conformidade com a Lei Geral de Protecao de Dados</p></div>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">100% Conforme</span>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {[
                    { label: 'Termos Assinados', value: '345/345' },
                    { label: 'Dados Criptografados', value: '100%' },
                    { label: 'Acessos Auditoria', value: '32/mes' },
                    { label: 'Incidentes', value: '0' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-3"><p className="text-blue-200 text-[10px] uppercase">{item.label}</p><p className="text-lg font-bold mt-1">{item.value}</p></div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'manager' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Minha Equipe', value: '12', icon: <Users size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Avaliacoes Pendentes', value: '4', icon: <BarChart3 size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Aprovacoes', value: '3', icon: <FileCheck size={18} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Flight Risks', value: '1', icon: <AlertTriangle size={18} />, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-3`}>{kpi.icon}</div>
                    <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-blue-600" /> Performance da Equipe</h3>
                  <table className="w-full">
                    <thead className="bg-gray-50"><tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Colaborador</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Nota</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Frequencia</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Metas</th>
                    </tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {teamPerformance.map((t, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-3 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">{t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div><span className="text-sm font-medium text-gray-800">{t.name}</span></div></td>
                          <td className="px-3 py-3"><span className={`text-sm font-bold ${t.score >= 9 ? 'text-green-600' : t.score >= 8 ? 'text-blue-600' : 'text-amber-600'}`}>{t.score}</span></td>
                          <td className="px-3 py-3"><span className={`text-xs px-2 py-1 rounded-full ${t.attendance >= 95 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.attendance}%</span></td>
                          <td className="px-3 py-3"><div className="w-16 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: `${t.goals}%`, backgroundColor: t.goals >= 80 ? '#10b981' : '#f59e0b' }}></div></div><span className="text-[10px] text-gray-500">{t.goals}%</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><AlertTriangle size={18} className="text-red-600" /> Riscos na Equipe</h3>
                  <div className="space-y-3">
                    {teamRisks.map((r, i) => (
                      <div key={i} className="bg-red-50 rounded-xl p-4 border border-red-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">{r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div><span className="text-sm font-medium text-gray-800">{r.name}</span></div>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.risk >= 60 ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>{r.risk}% risco</span>
                        </div>
                        <p className="text-xs text-gray-600 ml-10">Motivo: {r.reason}</p>
                        <div className="flex gap-2 mt-3 ml-10">
                          <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition">Reuniao 1:1</button>
                          <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition">Plano Retencao</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <h4 className="font-medium text-amber-800 text-sm mb-2">Aprovacoes Pendentes</h4>
                    {pendingApprovals.map((a, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-amber-100 last:border-0">
                        <div><p className="text-sm text-gray-800">{a.type} - {a.employee}</p><p className="text-[10px] text-gray-500">{a.detail}</p></div>
                        <div className="flex gap-1"><button className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">Aprovar</button><button className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200">Rejeitar</button></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Calendar size={18} className="text-purple-600" /> Proximas Reunioes 1:1</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Maria Santos', date: '28/07 10:00', topic: 'Plano de carreira', type: 'Desenvolvimento' },
                    { name: 'Carlos Souza', date: '29/07 14:00', topic: 'Feedback desempenho', type: 'Avaliacao' },
                    { name: 'Pedro Costa', date: '30/07 09:00', topic: 'Retencao', type: 'Urgente' },
                  ].map((m, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition cursor-pointer">
                      <div className="flex items-center justify-between mb-2"><span className={`text-[10px] px-2 py-0.5 rounded-full ${m.type === 'Urgente' ? 'bg-red-100 text-red-700' : m.type === 'Avaliacao' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{m.type}</span><span className="text-xs text-gray-400">{m.date}</span></div>
                      <p className="text-sm font-medium text-gray-800">{m.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{m.topic}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'director' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { label: 'Receita/Funcionario', value: 'R$ 145k', change: '+5%', positive: true, icon: <DollarSign size={18} />, color: 'text-green-600', bg: 'bg-green-50' },
                  { label: 'Custo Total Folha', value: 'R$ 2.8M', change: '+2%', positive: false, icon: <BarChart3 size={18} />, color: 'text-red-600', bg: 'bg-red-50' },
                  { label: 'Headcount Total', value: '345', change: '+12%', positive: true, icon: <Users size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'ROI Talento', value: '3.2x', change: '+0.4', positive: true, icon: <Brain size={18} />, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl ${kpi.bg} ${kpi.color} flex items-center justify-center mb-3`}>{kpi.icon}</div>
                    <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
                    <p className={`text-[10px] mt-1 flex items-center gap-0.5 ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{kpi.change} vs mes anterior
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><DollarSign size={18} className="text-green-600" /> Custo por Funcionario (Mensal)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={costData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString('pt-BR')}`} />
                      <Bar dataKey="cost" fill="#6366f1" name="Custo/Func" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Building2 size={18} className="text-indigo-600" /> Estrutura Organizacional</h3>
                  <div className="space-y-3">
                    {[
                      { dept: 'Tecnologia', head: 120, budget: 'R$ 960k', growth: '+15%' },
                      { dept: 'Operacoes', head: 65, budget: 'R$ 520k', growth: '+8%' },
                      { dept: 'RH', head: 45, budget: 'R$ 360k', growth: '+5%' },
                      { dept: 'Vendas', head: 40, budget: 'R$ 400k', growth: '+20%' },
                      { dept: 'Marketing', head: 38, budget: 'R$ 304k', growth: '+10%' },
                      { dept: 'Financeiro', head: 32, budget: 'R$ 256k', growth: '+3%' },
                    ].map((d, i) => (
                      <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3">
                        <div className="flex-1"><p className="text-sm font-medium text-gray-800">{d.dept}</p><p className="text-[10px] text-gray-500">{d.head} colaboradores</p></div>
                        <span className="text-sm font-bold text-gray-700">{d.budget}</span>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{d.growth}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Users size={18} className="text-purple-600" /> Diversidade e Inclusao</h3>
                  {diversityData.map((cat, ci) => (
                    <div key={ci} className="mb-4">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-2">{cat.category}</p>
                      <div className="flex gap-4">
                        {cat.items.map((item, ii) => (
                          <div key={ii} className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2"><div className="h-2 rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div></div>
                            <p className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</p>
                            <p className="text-[10px] text-gray-500">{item.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Target size={18} className="text-amber-600" /> Metas Estrategicas Q3</h3>
                  <div className="space-y-4">
                    {[
                      { goal: 'Reduzir turnover para 2.0%', progress: 75, status: 'Em andamento' },
                      { goal: 'Aumentar eNPS para +40', progress: 85, status: 'Em andamento' },
                      { goal: 'Contratar 15 devs ate Set', progress: 40, status: 'Atrasado' },
                      { goal: 'Lancar programa de mentoria', progress: 100, status: 'Concluido' },
                      { goal: 'Implementar 360 para todos', progress: 60, status: 'Em andamento' },
                    ].map((m, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{m.goal}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.status === 'Concluido' ? 'bg-green-100 text-green-700' : m.status === 'Atrasado' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{m.status}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="h-3 rounded-full transition-all" style={{ width: `${m.progress}%`, backgroundColor: m.progress === 100 ? '#10b981' : m.status === 'Atrasado' ? '#ef4444' : '#6366f1' }}></div>
                        </div>
                        <p className="text-[10px] text-gray-400 text-right mt-1">{m.progress}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div><h3 className="text-lg font-bold mb-1">Benchmark de Mercado</h3><p className="text-gray-400 text-sm">Comparativo com empresas do mesmo segmento</p></div>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {[
                    { label: 'Retencao', ours: '91.5%', market: '85%', result: '+6.5%' },
                    { label: 'Turnover', ours: '2.5%', market: '4.2%', result: '-1.7%' },
                    { label: 'Custo/Func', ours: 'R$ 8.2k', market: 'R$ 9.1k', result: '-10%' },
                    { label: 'Tempo Contrat', ours: '23 dias', market: '31 dias', result: '-8 dias' },
                  ].map((b, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4">
                      <p className="text-gray-400 text-[10px] uppercase">{b.label}</p>
                      <div className="flex items-end justify-between mt-2">
                        <div><p className="text-[10px] text-gray-400">Nos</p><p className="text-lg font-bold text-white">{b.ours}</p></div>
                        <div><p className="text-[10px] text-gray-400">Mercado</p><p className="text-lg font-bold text-gray-400">{b.market}</p></div>
                      </div>
                      <p className="text-xs text-green-400 mt-2 font-medium">{b.result} melhor</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}