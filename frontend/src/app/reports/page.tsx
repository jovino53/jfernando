'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  estimatedTime: string;
  frequency: string;
}

interface GeneratedReport {
  id: number;
  name: string;
  template: string;
  status: 'Concluído' | 'Processando' | 'Pendente' | 'Erro';
  date: string;
  generatedBy: string;
  size: string;
  format: string;
}

interface ScheduledReport {
  id: number;
  name: string;
  frequency: string;
  nextRun: string;
  lastRun: string;
  status: 'Ativo' | 'Pausado';
  recipients: string[];
}

const templates: ReportTemplate[] = [
  { id: 'headcount', name: 'Headcount & Evolução', description: 'Evolução do quadro de funcionários, admissões e desligamentos por período', category: 'Pessoal', icon: '👥', color: 'from-blue-500 to-indigo-600', estimatedTime: '~2 min', frequency: 'Mensal' },
  { id: 'turnover', name: 'Análise de Turnover', description: 'Taxa de rotatividade, motivos de desligamento e custos associados', category: 'Pessoal', icon: '📉', color: 'from-red-500 to-pink-600', estimatedTime: '~3 min', frequency: 'Mensal' },
  { id: 'compensation', name: 'Composição Salarial', description: 'Distribuição salarial, equity analysis, benchmarking e faixas salariais', category: 'Compensação', icon: '💰', color: 'from-green-500 to-emerald-600', estimatedTime: '~4 min', frequency: 'Trimestral' },
  { id: 'performance', name: 'Performance & Avaliações', description: 'Distribuição de notas, correlação performance x retenção, top/bottom performers', category: 'Performance', icon: '⭐', color: 'from-amber-500 to-orange-600', estimatedTime: '~3 min', frequency: 'Semestral' },
  { id: 'diversity', name: 'Diversidade & Inclusão', description: 'Composição por gênero, idade, etnia, PCD e indicadores de equidade', category: 'D&I', icon: '🌍', color: 'from-purple-500 to-violet-600', estimatedTime: '~2 min', frequency: 'Trimestral' },
  { id: 'engagement', name: 'Engajamento & Clima', description: 'Scores de engagement, NPS interno, heatmap de satisfação por área', category: 'Clima', icon: '💪', color: 'from-cyan-500 to-teal-600', estimatedTime: '~3 min', frequency: 'Semestral' },
  { id: 'recruitment', name: 'Pipeline de Recrutamento', description: 'Funil de contratação, time-to-hire, custo por hire, fontes de talento', category: 'Recrutamento', icon: '🎯', color: 'from-pink-500 to-rose-600', estimatedTime: '~2 min', frequency: 'Mensal' },
  { id: 'learning', name: 'Desenvolvimento & Treinamentos', description: 'Horas de treinamento, conclusão de trilhas, ROI de capacitação', category: 'Aprendizagem', icon: '📚', color: 'from-teal-500 to-cyan-600', estimatedTime: '~2 min', frequency: 'Trimestral' },
  { id: 'absence', name: 'Absenteeísmo', description: 'Índices de falta, afastamentos, licenças e impacto na produtividade', category: 'Pessoal', icon: '🏥', color: 'from-rose-500 to-red-600', estimatedTime: '~2 min', frequency: 'Mensal' },
  { id: 'succession', name: 'Mapa de Sucessão', description: 'Potenciais sucessores, gaps de success readiness, plano de contingência', category: 'Estratégico', icon: '🗺️', color: 'from-violet-500 to-purple-600', estimatedTime: '~5 min', frequency: 'Anual' },
  { id: 'cost', name: 'Custo por Departamento', description: 'Folha salarial, benefícios, encargos e custo total por unidade', category: 'Financeiro', icon: '📊', color: 'from-emerald-500 to-green-600', estimatedTime: '~3 min', frequency: 'Mensal' },
  { id: 'compliance', name: 'Compliance Trabalhista', description: 'Indicator de conformidade, pendências legais, LGPD e auditoria', category: 'Jurídico', icon: '⚖️', color: 'from-slate-500 to-gray-600', estimatedTime: '~4 min', frequency: 'Trimestral' },
];

const recentReports: GeneratedReport[] = [
  { id: 1, name: 'Headcount Geral — Junho 2026', template: 'Headcount', status: 'Concluído', date: '26/06/2026 09:15', generatedBy: 'Sistema', size: '2.4 MB', format: 'PDF' },
  { id: 2, name: 'Turnover Análise Q2 2026', template: 'Turnover', status: 'Concluído', date: '25/06/2026 14:30', generatedBy: 'Maria Santos', size: '1.8 MB', format: 'PDF' },
  { id: 3, name: 'Composição Salarial TI', template: 'Compensação', status: 'Processando', date: '26/06/2026 10:45', generatedBy: 'Pedro Costa', size: '—', format: 'Excel' },
  { id: 4, name: 'Dashboard Diversidade Q2', template: 'Diversidade', status: 'Concluído', date: '24/06/2026 11:00', generatedBy: 'Sistema', size: '3.1 MB', format: 'PDF' },
  { id: 5, name: 'Pipeline Recrutamento Maio', template: 'Recrutamento', status: 'Concluído', date: '01/06/2026 08:00', generatedBy: 'Sistema', size: '1.2 MB', format: 'PDF' },
  { id: 6, name: 'Engajamento Semestral 2026', template: 'Engajamento', status: 'Erro', date: '20/06/2026 16:20', generatedBy: 'Juliana Mendes', size: '—', format: 'PDF' },
];

const scheduledReports: ScheduledReport[] = [
  { id: 1, name: 'Headcount Mensal', frequency: 'Todo dia 5 às 08:00', nextRun: '05/07/2026', lastRun: '05/06/2026', status: 'Ativo', recipients: ['maria@nexus.com', 'rh@nexus.com'] },
  { id: 2, name: 'Turnover Semanal', frequency: 'Toda segunda às 09:00', nextRun: '29/06/2026', lastRun: '22/06/2026', status: 'Ativo', recipients: ['diretoria@nexus.com'] },
  { id: 3, name: 'Absenteísmo Quinzenal', frequency: 'A cada 15 dias', nextRun: '01/07/2026', lastRun: '15/06/2026', status: 'Ativo', recipients: ['gestores@nexus.com'] },
  { id: 4, name: 'Composição Salarial', frequency: 'Trimestral', nextRun: '01/07/2026', lastRun: '01/04/2026', status: 'Pausado', recipients: ['financeiro@nexus.com'] },
];

const categories = ['Todos', 'Pessoal', 'Compensação', 'Performance', 'D&I', 'Clima', 'Recrutamento', 'Aprendizagem', 'Estratégico', 'Financeiro', 'Jurídico'];

const categoryColors: Record<string, string> = {
  'Pessoal': 'bg-blue-100 text-blue-700',
  'Compensação': 'bg-green-100 text-green-700',
  'Performance': 'bg-amber-100 text-amber-700',
  'D&I': 'bg-purple-100 text-purple-700',
  'Clima': 'bg-cyan-100 text-cyan-700',
  'Recrutamento': 'bg-pink-100 text-pink-700',
  'Aprendizagem': 'bg-teal-100 text-teal-700',
  'Estratégico': 'bg-violet-100 text-violet-700',
  'Financeiro': 'bg-emerald-100 text-emerald-700',
  'Jurídico': 'bg-slate-100 text-slate-700',
};

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<'templates' | 'recent' | 'scheduled' | 'builder'>('templates');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [generating, setGenerating] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [builderFields, setBuilderFields] = useState({ title: '', category: 'Pessoal', metrics: [] as string[], filters: 'Todos', format: 'PDF', schedule: 'manual' });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveConfig, setSaveConfig] = useState({ folder: 'Relatórios/2026', fileName: '', format: 'PDF' });
  const [currentFolder, setCurrentFolder] = useState<string[]>(['Relatórios', '2026']);
  const [notifications, setNotifications] = useState<{ id: number; msg: string; time: string; read: boolean }[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [viewingReport, setViewingReport] = useState<GeneratedReport | null>(null);

  const showToast = (msg: string) => {
    const id = Date.now();
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setNotifications((prev) => [{ id, msg, time, read: false }, ...prev]);
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const filteredTemplates = filterCategory === 'Todos' ? templates : templates.filter((t) => t.category === filterCategory);

  const handleGenerate = (template: ReportTemplate) => {
    setSaveConfig({ ...saveConfig, fileName: `${template.name.replace(/[&]/g, 'e')}_${new Date().toISOString().slice(0, 10)}` });
    setGenerating(template.id);
    setShowSaveModal(true);
  };

  const handleConfirmSave = () => {
    setShowSaveModal(false);
    setTimeout(() => {
      setGenerating(null);
      showToast(`Relatório salvo em: ${saveConfig.folder}/${saveConfig.fileName}.${saveConfig.format.toLowerCase()}`);
    }, 1500);
  };

  const folderStructure = [
    { name: 'Relatórios', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/2026', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/2026/Q1', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/2026/Q2', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/2026/Financeiro', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/2026/RH', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/2026/Marketing', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/Backup', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/Arquivo', icon: '📁', type: 'folder' as const },
    { name: 'Relatórios/2026/headcount_jun_2026.pdf', icon: '📄', type: 'file' as const },
    { name: 'Relatórios/2026/turnover_q2_2026.pdf', icon: '📄', type: 'file' as const },
    { name: 'Relatórios/2026/Q1/headcount_q1.pdf', icon: '📄', type: 'file' as const },
  ];

  const allMetrics = ['Headcount', 'Turnover', 'Performance', 'Salários', 'Diversidade', 'Engajamento', 'Treinamentos', 'Absenteísmo', 'Recrutamento', 'Custos'];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {toast && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '1s' }}>
              <span className="text-xl">✅</span>
              <div>
                <p className="font-medium text-sm">{toast}</p>
                <p className="text-[10px] text-green-100 mt-0.5">Clique no 🔔 para ver o histórico</p>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
              <p className="text-sm text-gray-500 mt-1">Gere, agende e gerencie relatórios de RH</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-3 shadow-sm text-center px-5">
                <p className="text-2xl font-bold text-blue-600">{recentReports.filter((r) => r.status === 'Concluído').length}</p>
                <p className="text-[10px] text-gray-400">Gerados</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm text-center px-5">
                <p className="text-2xl font-bold text-green-600">{scheduledReports.filter((s) => s.status === 'Ativo').length}</p>
                <p className="text-[10px] text-gray-400">Agendados</p>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm text-center px-5">
                <p className="text-2xl font-bold text-purple-600">{templates.length}</p>
                <p className="text-[10px] text-gray-400">Templates</p>
              </div>
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="relative bg-white rounded-xl p-3 shadow-sm hover:bg-gray-50 transition">
                  <span className="text-xl">🔔</span>
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">{notifications.filter((n) => !n.read).length}</span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border z-50 max-h-96 overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                      <h3 className="font-bold text-gray-800">Notificações</h3>
                      <div className="flex gap-2">
                        <button onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))} className="text-xs text-primary-600 hover:text-primary-800">Marcar todas como lidas</button>
                        <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600">&times;</button>
                      </div>
                    </div>
                    <div className="overflow-y-auto max-h-72">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 text-sm">Nenhuma notificação</div>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} onClick={() => { setViewingReport({ id: n.id, name: n.msg.replace('Relatório salvo em: ', '').split('/').pop()?.replace('.pdf', '').replace('.xlsx', '').replace('.csv', '') || n.msg, template: 'Personalizado', status: 'Concluído', date: n.time, generatedBy: 'Você', size: '1.8 MB', format: 'PDF' }); setShowNotifications(false); }}
                            className={`p-4 border-b hover:bg-gray-50 transition cursor-pointer ${!n.read ? 'bg-blue-50' : ''}`}>
                            <div className="flex items-start gap-3">
                              <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-transparent'}`}></span>
                              <div className="flex-1">
                                <p className="text-sm text-gray-700">{n.msg}</p>
                                <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                              </div>
                              <span className="text-lg">📄</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t bg-gray-50 text-center">
                        <button onClick={() => setNotifications([])} className="text-xs text-gray-500 hover:text-gray-700">Limpar todas</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm w-fit">
            {[
              { key: 'templates', label: 'Templates', icon: '📋' },
              { key: 'recent', label: 'Recentes', icon: '🕐' },
              { key: 'scheduled', label: 'Agendados', icon: '⏰' },
              { key: 'builder', label: 'Personalizado', icon: '🔧' },
            ].map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition ${activeTab === tab.key ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'templates' && (
            <>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((c) => (
                  <button key={c} onClick={() => setFilterCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${filterCategory === c ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}>{c}</button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-5">
                {filteredTemplates.map((t) => (
                  <div key={t.id} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition group">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-xl text-white shadow-md`}>{t.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition">{t.name}</h3>
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${categoryColors[t.category]}`}>{t.category}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">{t.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mb-3">
                      <span>⏱ {t.estimatedTime}</span>
                      <span>📅 {t.frequency}</span>
                    </div>
                    <button onClick={() => handleGenerate(t)} disabled={generating === t.id}
                      className={`w-full py-2 rounded-lg text-sm font-medium transition ${generating === t.id ? 'bg-gray-100 text-gray-400' : `bg-gradient-to-r ${t.color} text-white hover:shadow-md`}`}>
                      {generating === t.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                          Gerando...
                        </span>
                      ) : 'Gerar Relatório'}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'recent' && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Relatórios Gerados</h3>
                <span className="text-xs text-gray-400">{recentReports.length} relatório(s)</span>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Relatório</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gerado por</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tamanho</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentReports.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center text-sm">📄</div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{r.name}</p>
                            <p className="text-[10px] text-gray-400">{r.format}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4"><span className={`text-[10px] font-medium px-2 py-1 rounded-full ${categoryColors[r.template] || 'bg-gray-100 text-gray-600'}`}>{r.template}</span></td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${r.status === 'Concluído' ? 'bg-green-100 text-green-700' : r.status === 'Processando' ? 'bg-yellow-100 text-yellow-700' : r.status === 'Erro' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                          {r.status === 'Processando' && '⏳ '}{r.status === 'Erro' && '❌ '}{r.status === 'Concluído' && '✅ '}{r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500">{r.date}</td>
                      <td className="px-5 py-4 text-xs text-gray-500">{r.generatedBy}</td>
                      <td className="px-5 py-4 text-xs text-gray-500">{r.size}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          {r.status === 'Concluído' && (
                            <>
                              <button onClick={() => setViewingReport(r)} className="text-xs text-primary-600 hover:text-primary-800 font-medium px-2 py-1 bg-primary-50 rounded-lg hover:bg-primary-100 transition">👁 Ver</button>
                              <button onClick={() => showToast(`Download iniciado: ${r.name}.${r.format.toLowerCase() === 'excel' ? 'xlsx' : r.format.toLowerCase()}`)} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition">⬇ Download</button>
                            </>
                          )}
                          {r.status === 'Erro' && <button className="text-xs text-red-600 hover:text-red-800 font-medium">🔄 Retry</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'scheduled' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Relatórios Agendados</h3>
                <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">+ Novo Agendamento</button>
              </div>
              {scheduledReports.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${s.status === 'Ativo' ? 'bg-green-100' : 'bg-gray-100'}`}>⏰</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{s.name}</h4>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{s.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">📅 {s.frequency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Próxima execução</p>
                    <p className="text-sm font-medium text-gray-700">{s.nextRun}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Última execução</p>
                    <p className="text-sm font-medium text-gray-700">{s.lastRun}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Destinatários</p>
                    <p className="text-sm font-medium text-gray-700">{s.recipients.length}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-primary-600 hover:text-primary-800 font-medium px-3 py-1.5 bg-primary-50 rounded-lg">Editar</button>
                    <button className={`text-xs font-medium px-3 py-1.5 rounded-lg ${s.status === 'Ativo' ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-green-600 bg-green-50 hover:bg-green-100'}`}>
                      {s.status === 'Ativo' ? '⏸ Pausar' : '▶ Ativar'}
                    </button>
                  </div>
                </div>
              ))}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Configurações de Destinatários</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-blue-800">Diretoria</p>
                    <p className="text-xs text-blue-600 mt-1">diretoria@nexus.com</p>
                    <p className="text-xs text-blue-600">ceo@nexus.com</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-purple-800">RH</p>
                    <p className="text-xs text-purple-600 mt-1">rh@nexus.com</p>
                    <p className="text-xs text-purple-600">maria.santos@nexus.com</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-green-800">Gestores</p>
                    <p className="text-xs text-green-600 mt-1">gestores@nexus.com</p>
                    <p className="text-xs text-green-600">Líderes de área</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'builder' && (
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Construtor de Relatório Personalizado</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Nome do Relatório</label>
                    <input type="text" value={builderFields.title} onChange={(e) => setBuilderFields({ ...builderFields, title: e.target.value })} placeholder="Ex: Relatório Executivo Q2 2026" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Categoria</label>
                      <select value={builderFields.category} onChange={(e) => setBuilderFields({ ...builderFields, category: e.target.value })} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                        {categories.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Formato</label>
                      <select value={builderFields.format} onChange={(e) => setBuilderFields({ ...builderFields, format: e.target.value })} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option value="PDF">PDF</option>
                        <option value="Excel">Excel</option>
                        <option value="CSV">CSV</option>
                        <option value="Dashboard">Dashboard Online</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Métricas Incluídas</label>
                    <div className="flex flex-wrap gap-2">
                      {allMetrics.map((m) => {
                        const included = builderFields.metrics.includes(m);
                        return (
                          <button key={m} onClick={() => setBuilderFields({ ...builderFields, metrics: included ? builderFields.metrics.filter((x) => x !== m) : [...builderFields.metrics, m] })}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${included ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{m}</button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Filtro de Período</label>
                      <select value={builderFields.filters} onChange={(e) => setBuilderFields({ ...builderFields, filters: e.target.value })} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>Todos</option><option>Último mês</option><option>Último trimestre</option><option>Último semestre</option><option>Último ano</option><option>Personalizado</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Agendamento</label>
                      <select value={builderFields.schedule} onChange={(e) => setBuilderFields({ ...builderFields, schedule: e.target.value })} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option value="manual">Manual (uma vez)</option><option value="weekly">Semanal</option><option value="monthly">Mensal</option><option value="quarterly">Trimestral</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={() => showToast('Relatório personalizado gerado!')} className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition">
                    Gerar Relatório Personalizado
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <h4 className="font-semibold text-gray-800 mb-3">Preview</h4>
                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed">
                    <div className="text-center mb-3">
                      <p className="text-lg font-bold text-gray-700">{builderFields.title || 'Seu Relatório'}</p>
                      <p className="text-xs text-gray-400">{builderFields.category} • {builderFields.format}</p>
                    </div>
                    <div className="space-y-1.5">
                      {builderFields.metrics.length > 0 ? builderFields.metrics.map((m) => (
                        <div key={m} className="flex items-center gap-2 text-xs text-gray-600 bg-white px-2 py-1 rounded">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>{m}
                        </div>
                      )) : <p className="text-xs text-gray-400 text-center">Selecione métricas acima</p>}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-5">
                  <h4 className="font-semibold text-gray-800 mb-3">Dicas</h4>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Combine métricas de diferentes áreas para visão 360°</div>
                    <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Relatórios trimestrais são ideais para apresentação ao board</div>
                    <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Exporte em Excel para análises customizadas</div>
                    <div className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Agende para envio automático aos stakeholders</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Salvar Relatório</h2>
                <p className="text-xs text-gray-500">Escolha o local e o nome do arquivo</p>
              </div>
              <button onClick={() => { setShowSaveModal(false); setGenerating(null); }} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">📁 Local de Salvamento</label>
                <div className="bg-gray-50 rounded-xl border max-h-48 overflow-y-auto">
                  {folderStructure.map((item, i) => {
                    const depth = item.name.split('/').length - 1;
                    const isSelected = saveConfig.folder === item.name && item.type === 'folder';
                    const isFile = item.type === 'file';
                    return (
                      <div key={i} onClick={() => !isFile && setSaveConfig({ ...saveConfig, folder: item.name })}
                        className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition ${isSelected ? 'bg-primary-100 text-primary-700 font-medium' : isFile ? 'text-gray-400 cursor-default' : 'text-gray-700 hover:bg-gray-100'}`}
                        style={{ paddingLeft: `${12 + depth * 16}px` }}>
                        <span>{item.icon}</span>
                        <span className="truncate">{item.name.split('/').pop()}</span>
                        {isSelected && <span className="ml-auto text-primary-500 text-xs">✓</span>}
                        {isFile && <span className="ml-auto text-[10px] text-gray-300">{item.name.split('.').pop()?.toUpperCase()}</span>}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-gray-400 mt-1">📍 {saveConfig.folder}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">📝 Nome do Arquivo</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={saveConfig.fileName} onChange={(e) => setSaveConfig({ ...saveConfig, fileName: e.target.value })} className="flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  <select value={saveConfig.format} onChange={(e) => setSaveConfig({ ...saveConfig, format: e.target.value })} className="border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="PDF">.pdf</option>
                    <option value="Excel">.xlsx</option>
                    <option value="CSV">.csv</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3">
                <span className="text-xl">📄</span>
                <div>
                  <p className="text-xs font-medium text-blue-800">{saveConfig.fileName || 'arquivo'}.{saveConfig.format.toLowerCase() === 'excel' ? 'xlsx' : saveConfig.format.toLowerCase()}</p>
                  <p className="text-[10px] text-blue-500">{saveConfig.folder}/{saveConfig.fileName || 'arquivo'}.{saveConfig.format.toLowerCase() === 'excel' ? 'xlsx' : saveConfig.format.toLowerCase()}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button onClick={() => { setShowSaveModal(false); setGenerating(null); }} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium">Cancelar</button>
              <button onClick={handleConfirmSave} disabled={!saveConfig.fileName.trim()} className="px-5 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 text-sm font-medium disabled:opacity-50 flex items-center gap-2">
                {generating ? (
                  <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> Salvando...</>
                ) : (
                  <><span>💾</span> Salvar Relatório</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center text-lg">📄</div>
                <div>
                  <h2 className="font-bold text-gray-900">{viewingReport.name}</h2>
                  <p className="text-xs text-gray-500">{viewingReport.format} • {viewingReport.size} • {viewingReport.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { showToast(`Download: ${viewingReport.name}`); }} className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center gap-2">⬇ Download</button>
                <button onClick={() => setViewingReport(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
              <div className="bg-white rounded-xl shadow-sm p-8 max-w-3xl mx-auto">
                <div className="text-center mb-8 border-b pb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Nexus RH AI™</h1>
                  <h2 className="text-lg text-gray-600">{viewingReport.name}</h2>
                  <p className="text-sm text-gray-400 mt-2">Período: Janeiro - Junho 2026 | Gerado em: {viewingReport.date}</p>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">54</p>
                    <p className="text-xs text-gray-500">Colaboradores</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">82.3</p>
                    <p className="text-xs text-gray-500">Performance Média</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">18.5%</p>
                    <p className="text-xs text-gray-500">Turnover</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-amber-600">3.8/5</p>
                    <p className="text-xs text-gray-500">Engajamento</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Resumo Executivo</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Este relatório apresenta uma visão abrangente do capital humano da Nexus RH AI no primeiro semestre de 2026. Com um quadro de 54 colaboradores, a empresa manteve indicadores acima da média de mercado, com destaque para o engajamento (3.8/5) e performance (82.3 pontos). O turnover de 18.5% está dentro da meta estabelecida (&lt;20%), porém ações preventivas são recomendadas para os departamentos com maior risco.</p>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Distribuição por Departamento</h3>
                  <div className="space-y-2">
                    {[{ name: 'TI', pct: 33, count: 18 }, { name: 'Marketing', pct: 22, count: 12 }, { name: 'Financeiro', pct: 19, count: 10 }, { name: 'RH', pct: 15, count: 8 }, { name: 'Vendas', pct: 11, count: 6 }].map((d) => (
                      <div key={d.name} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-20">{d.name}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                          <div className="h-4 rounded-full bg-primary-500" style={{ width: `${d.pct}%` }}></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700 w-12 text-right">{d.count} ({d.pct}%)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Indicadores Chave</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Indicador</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Resultado</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Meta</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr><td className="px-4 py-2">Headcount Total</td><td className="px-4 py-2 font-medium">54</td><td className="px-4 py-2">60</td><td className="px-4 py-2"><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ No caminho</span></td></tr>
                      <tr><td className="px-4 py-2">Turnover Anual</td><td className="px-4 py-2 font-medium">18.5%</td><td className="px-4 py-2">&lt;20%</td><td className="px-4 py-2"><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Dentro da meta</span></td></tr>
                      <tr><td className="px-4 py-2">Performance Média</td><td className="px-4 py-2 font-medium">82.3</td><td className="px-4 py-2">80</td><td className="px-4 py-2"><span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Acima da meta</span></td></tr>
                      <tr><td className="px-4 py-2">Engajamento</td><td className="px-4 py-2 font-medium">3.8/5</td><td className="px-4 py-2">4.0/5</td><td className="px-4 py-2"><span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">⚠ Próximo</span></td></tr>
                      <tr><td className="px-4 py-2">Diversidade (Feminino)</td><td className="px-4 py-2 font-medium">38%</td><td className="px-4 py-2">40%</td><td className="px-4 py-2"><span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">⚠ Próximo</span></td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Recomendações IA</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg"><span className="text-blue-500 mt-0.5">1.</span><p className="text-sm text-gray-700">Implementar programa de reconhecimento para reduzir turnover em 30%</p></div>
                    <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg"><span className="text-blue-500 mt-0.5">2.</span><p className="text-sm text-gray-700">Revisão salarial Q3 para colaboradores com performance acima de 90</p></div>
                    <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg"><span className="text-blue-500 mt-0.5">3.</span><p className="text-sm text-gray-700">Ação urgente: reengajar Ricardo Pereira (risco alto de desligamento)</p></div>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-400 border-t pt-4">
                  <p>Nexus RH AI™ — Relatório Gerado Automaticamente</p>
                  <p>Confidencial — Uso Interno Apenas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
