'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Search, Filter, Plus, Star, Mail, Phone, MapPin, Briefcase, GraduationCap, Clock, ExternalLink, MoreVertical, Eye, Edit, Trash2, Calendar, ChevronDown, X, Check, ArrowUpRight, FileText, User, Building2, Award, AlertCircle } from 'lucide-react';

const sampleCandidates = [
  { id: '1', name: 'Lucas Ferreira', email: 'lucas.ferreira@email.com', phone: '(11) 98765-4321', city: 'São Paulo', state: 'SP', experienceYears: 5, educationLevel: 'Superior Completo', expectedSalary: 12000, availability: 'Imediata', source: 'linkedin', status: 'INTERVIEW', rating: 4, tags: ['React', 'Node.js', 'TypeScript'], createdAt: '2026-07-20', jobPosition: { title: 'Desenvolvedor Full Stack' }, linkedin: 'https://linkedin.com/in/lucasf', notes: 'Ótima experiência com React e Node. Ficou impressionado na entrevista técnica.' },
  { id: '2', name: 'Mariana Costa', email: 'mariana.costa@email.com', phone: '(11) 97654-3210', city: 'São Paulo', state: 'SP', experienceYears: 8, educationLevel: 'Pós-graduação', expectedSalary: 15000, availability: '30 dias', source: 'indicação', status: 'OFFER', rating: 5, tags: ['Gestão de Projetos', 'Scrum', 'Liderança'], createdAt: '2026-07-18', jobPosition: { title: 'Gerente de Projetos' }, linkedin: 'https://linkedin.com/in/marianac', notes: 'Candidata excepcional. Experiência sólida em gestão. Proposta enviada.' },
  { id: '3', name: 'Pedro Santos', email: 'pedro.santos@email.com', phone: '(21) 99876-5432', city: 'Rio de Janeiro', state: 'RX', experienceYears: 3, educationLevel: 'Superior Completo', expectedSalary: 8000, availability: 'Imediata', source: 'portal', status: 'SCREENING', rating: 3, tags: ['Marketing Digital', 'SEO', 'Google Ads'], createdAt: '2026-07-22', jobPosition: { title: 'Analista de Marketing' }, notes: 'Perfil interessante. Aguardando análise de currículo.' },
  { id: '4', name: 'Ana Beatriz', email: 'ana.beatriz@email.com', phone: '(31) 98654-3210', city: 'Belo Horizonte', state: 'MG', experienceYears: 2, educationLevel: 'Superior Incompleto', expectedSalary: 5000, availability: 'Imediata', source: 'portal', status: 'APPLIED', rating: null, tags: ['UX Design', 'Figma'], createdAt: '2026-07-24', jobPosition: { title: 'Designer UX/UI' } },
  { id: '5', name: 'Roberto Almeida', email: 'roberto.almeida@email.com', phone: '(41) 99765-4321', city: 'Curitiba', state: 'PR', experienceYears: 10, educationLevel: 'MBA', expectedSalary: 20000, availability: '60 dias', source: 'linkedin', status: 'HIRED', rating: 5, tags: ['Financeiro', 'Controller', 'IFRS'], createdAt: '2026-07-10', jobPosition: { title: 'Controller Financeiro' }, notes: 'Contratado! Início previsto para 01/09.' },
  { id: '6', name: 'Camila Rodrigues', email: 'camila.rodrigues@email.com', phone: '(51) 98543-2109', city: 'Porto Alegre', state: 'RS', experienceYears: 4, educationLevel: 'Superior Completo', expectedSalary: 9000, availability: '15 dias', source: 'indicação', status: 'REJECTED', rating: 2, tags: ['RH', 'Recrutamento', 'Selection'], createdAt: '2026-07-15', jobPosition: { title: 'Analista de RH' }, notes: 'Não se encaixa no perfil cultural. Agradecemos a participação.' },
  { id: '7', name: 'Thiago Mendes', email: 'thiago.mendes@email.com', phone: '(61) 99432-1098', city: 'Brasília', state: 'DF', experienceYears: 6, educationLevel: 'Superior Completo', expectedSalary: 14000, availability: 'Imediata', source: 'portal', status: 'INTERVIEW', rating: 4, tags: ['DevOps', 'AWS', 'Docker', 'Kubernetes'], createdAt: '2026-07-19', jobPosition: { title: 'Engenheiro DevOps' }, linkedin: 'https://linkedin.com/in/thiagom' },
  { id: '8', name: 'Juliana Lima', email: 'juliana.lima@email.com', phone: '(85) 98321-0987', city: 'Fortaleza', state: 'CE', experienceYears: 7, educationLevel: 'Pós-graduação', expectedSalary: 13000, availability: '30 dias', source: 'linkedin', status: 'PROPOSAL', rating: 4, tags: ['Data Analytics', 'Python', 'SQL', 'Power BI'], createdAt: '2026-07-16', jobPosition: { title: 'Analista de Dados Senior' }, notes: 'Proposta enviada. Aguardando resposta até 01/08.' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  APPLIED: { label: 'Candidatura', color: 'text-blue-700', bg: 'bg-blue-100' },
  SCREENING: { label: 'Triagem', color: 'text-purple-700', bg: 'bg-purple-100' },
  INTERVIEW: { label: 'Entrevista', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  TECHNICAL_TEST: { label: 'Teste Técnico', color: 'text-amber-700', bg: 'bg-amber-100' },
  PROPOSAL: { label: 'Proposta', color: 'text-orange-700', bg: 'bg-orange-100' },
  OFFER: { label: 'Proposta Enviada', color: 'text-cyan-700', bg: 'bg-cyan-100' },
  HIRED: { label: 'Contratado', color: 'text-green-700', bg: 'bg-green-100' },
  REJECTED: { label: 'Rejeitado', color: 'text-red-700', bg: 'bg-red-100' },
  WITHDRAWN: { label: 'Desistiu', color: 'text-gray-700', bg: 'bg-gray-100' },
};

const sourceConfig: Record<string, string> = {
  linkedin: '🔗 LinkedIn',
  portal: '🌐 Portal',
  'indicação': '👥 Indicação',
  manual: '📝 Manual',
  email: '📧 Email',
};

const educationLevels = ['Ensino Médio', 'Superior Incompleto', 'Superior Completo', 'Pós-graduação', 'MBA', 'Mestrado', 'Doutorado'];
const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
const availabilityOptions = ['Imediata', '15 dias', '30 dias', '60 dias', '90 dias'];

export default function ResumesPage() {
  const [candidates, setCandidates] = useState(sampleCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showNewCandidate, setShowNewCandidate] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [toast, setToast] = useState('');
  const [sortField, setSortField] = useState<'name' | 'createdAt' | 'rating'>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [newCandidate, setNewCandidate] = useState({
    name: '', email: '', phone: '', city: '', state: 'SP', linkedin: '',
    experienceYears: 0, educationLevel: 'Superior Completo', expectedSalary: 0,
    availability: 'Imediata', tags: '', coverLetter: '', source: 'manual',
    jobPositionId: '1',
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = candidates
    .filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus = filterStatus === 'all' || c.status === filterStatus;
      const matchSource = filterSource === 'all' || c.source === filterSource;
      return matchSearch && matchStatus && matchSource;
    })
    .sort((a, b) => {
      if (sortField === 'rating') return sortDir === 'desc' ? (b.rating || 0) - (a.rating || 0) : (a.rating || 0) - (b.rating || 0);
      if (sortField === 'name') return sortDir === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
      return sortDir === 'desc' ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt);
    });

  const stats = {
    total: candidates.length,
    applied: candidates.filter(c => c.status === 'APPLIED').length,
    interview: candidates.filter(c => c.status === 'INTERVIEW').length,
    offer: candidates.filter(c => ['OFFER', 'PROPOSAL'].includes(c.status)).length,
    hired: candidates.filter(c => c.status === 'HIRED').length,
    rejected: candidates.filter(c => c.status === 'REJECTED').length,
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, status: newStatus } : c));
    showToast(`Status alterado para ${statusConfig[newStatus]?.label}`);
  };

  const handleRating = (id: string, rating: number) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, rating } : c));
    showToast(`Avaliação atualizada: ${rating} estrelas`);
  };

  const handleDelete = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
    setShowDetail(false);
    showToast('Candidato removido com sucesso');
  };

  const handleAddCandidate = () => {
    if (!newCandidate.name || !newCandidate.email) {
      showToast('Preencha nome e email');
      return;
    }
    const candidate = {
      id: String(Date.now()),
      ...newCandidate,
      tags: newCandidate.tags.split(',').map(t => t.trim()).filter(Boolean),
      status: 'APPLIED' as const,
      rating: null,
      createdAt: new Date().toISOString().split('T')[0],
      jobPosition: { title: 'Vaga' },
    };
    setCandidates([candidate, ...candidates]);
    setShowNewCandidate(false);
    setNewCandidate({ name: '', email: '', phone: '', city: '', state: 'SP', linkedin: '', experienceYears: 0, educationLevel: 'Superior Completo', expectedSalary: 0, availability: 'Imediata', tags: '', coverLetter: '', source: 'manual', jobPositionId: '1' });
    showToast('Candidato cadastrado com sucesso!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {toast && (
            <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '1s' }}>
              <Check size={20} /><p className="font-medium text-sm">{toast}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Base de Currículos</h1>
              <p className="text-sm text-gray-500 mt-1">Gerencie candidatos e acompanhe o processo seletivo</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowNewCandidate(true)} className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2">
                <Plus size={16} /> Novo Candidato
              </button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 mb-6">
            {[
              { label: 'Total', value: stats.total, color: 'text-gray-900', bg: 'bg-gray-100', icon: '👥' },
              { label: 'Candidaturas', value: stats.applied, color: 'text-blue-600', bg: 'bg-blue-50', icon: '📥' },
              { label: 'Entrevistas', value: stats.interview, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: '💬' },
              { label: 'Propostas', value: stats.offer, color: 'text-orange-600', bg: 'bg-orange-50', icon: '📋' },
              { label: 'Contratados', value: stats.hired, color: 'text-green-600', bg: 'bg-green-50', icon: '✅' },
              { label: 'Rejeitados', value: stats.rejected, color: 'text-red-600', bg: 'bg-red-50', icon: '❌' },
            ].map((k) => (
              <div key={k.label} className={`${k.bg} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-1"><span>{k.icon}</span><span className="text-[10px] text-gray-500 uppercase">{k.label}</span></div>
                <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, email ou habilidade..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="all">Todos os status</option>
              {Object.entries(statusConfig).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
            </select>
            <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="all">Todas as fontes</option>
              <option value="linkedin">LinkedIn</option>
              <option value="portal">Portal</option>
              <option value="indicação">Indicação</option>
              <option value="manual">Manual</option>
            </select>
            <select value={`${sortField}-${sortDir}`} onChange={(e) => { const [f, d] = e.target.value.split('-'); setSortField(f as any); setSortDir(d as any); }}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="createdAt-desc">Mais recentes</option>
              <option value="createdAt-asc">Mais antigos</option>
              <option value="name-asc">Nome A-Z</option>
              <option value="rating-desc">Melhor avaliados</option>
            </select>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition cursor-pointer group" onClick={() => { setSelectedCandidate(c); setShowDetail(true); }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg">{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusConfig[c.status]?.bg} ${statusConfig[c.status]?.color}`}>{statusConfig[c.status]?.label}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition">{c.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1"><Mail size={12} /> {c.email}</p>
                  {c.city && <p className="text-xs text-gray-400 mb-2 flex items-center gap-1"><MapPin size={12} /> {c.city}, {c.state}</p>}
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Briefcase size={12} /> {c.experienceYears} anos</span>
                    <span className="flex items-center gap-1"><GraduationCap size={12} /> {c.educationLevel}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {c.tags.slice(0, 3).map((tag, i) => <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>)}
                    {c.tags.length > 3 && <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{c.tags.length - 3}</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={(e) => { e.stopPropagation(); handleRating(c.id, star); }}
                          className="hover:scale-125 transition"><Star size={14} className={c.rating && star <= c.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} /></button>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400">{sourceConfig[c.source] || c.source}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidato</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vaga</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Experiência</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avaliação</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fonte</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => { setSelectedCandidate(c); setShowDetail(true); }}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{c.name}</p>
                            <p className="text-[10px] text-gray-400">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700">{c.jobPosition?.title || '—'}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{c.experienceYears} anos</td>
                      <td className="px-5 py-4"><span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusConfig[c.status]?.bg} ${statusConfig[c.status]?.color}`}>{statusConfig[c.status]?.label}</span></td>
                      <td className="px-5 py-4">
                        <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} className={c.rating && s <= c.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />)}</div>
                      </td>
                      <td className="px-5 py-4 text-xs text-gray-500">{sourceConfig[c.source]}</td>
                      <td className="px-5 py-4"><button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-2">Nenhum candidato encontrado</p>
              <p className="text-gray-400 text-sm">Tente ajustar os filtros ou adicione um novo candidato</p>
            </div>
          )}
        </main>
      </div>

      {showDetail && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-gray-900">Detalhes do Candidato</h2>
              <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl">{selectedCandidate.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h3>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusConfig[selectedCandidate.status]?.bg} ${statusConfig[selectedCandidate.status]?.color}`}>{statusConfig[selectedCandidate.status]?.label}</span>
                  </div>
                  <p className="text-sm text-gray-500">{selectedCandidate.jobPosition?.title} • {selectedCandidate.city}, {selectedCandidate.state}</p>
                  <div className="flex gap-0.5 mt-2">{[1, 2, 3, 4, 5].map(s => <button key={s} onClick={() => handleRating(selectedCandidate.id, s)}><Star size={16} className={selectedCandidate.rating && s <= selectedCandidate.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 hover:text-amber-300'} /></button>)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Email</p><p className="text-sm font-medium text-gray-800">{selectedCandidate.email}</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Telefone</p><p className="text-sm font-medium text-gray-800">{selectedCandidate.phone || '—'}</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Experiência</p><p className="text-sm font-medium text-gray-800">{selectedCandidate.experienceYears} anos</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Escolaridade</p><p className="text-sm font-medium text-gray-800">{selectedCandidate.educationLevel}</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Pretensão Salarial</p><p className="text-sm font-medium text-gray-800">R$ {selectedCandidate.expectedSalary?.toLocaleString('pt-BR')}</p></div>
                <div className="bg-gray-50 rounded-xl p-4"><p className="text-[10px] text-gray-400 uppercase mb-1">Disponibilidade</p><p className="text-sm font-medium text-gray-800">{selectedCandidate.availability}</p></div>
              </div>

              {selectedCandidate.linkedin && (
                <div className="mb-4"><p className="text-xs text-gray-500 mb-1">LinkedIn</p><a href={selectedCandidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">{selectedCandidate.linkedin} <ArrowUpRight size={14} /></a></div>
              )}

              {selectedCandidate.tags.length > 0 && (
                <div className="mb-4"><p className="text-xs text-gray-500 mb-2">Habilidades</p><div className="flex flex-wrap gap-2">{selectedCandidate.tags.map((t: string, i: number) => <span key={i} className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{t}</span>)}</div></div>
              )}

              {selectedCandidate.notes && (
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-4">
                  <p className="text-xs text-amber-700 font-medium mb-1">📝 Notas</p>
                  <p className="text-sm text-amber-800">{selectedCandidate.notes}</p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap mt-6">
                <p className="text-xs text-gray-500 w-full mb-1">Alterar Status:</p>
                {Object.entries(statusConfig).map(([key, val]) => (
                  <button key={key} onClick={() => handleStatusChange(selectedCandidate.id, key)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${selectedCandidate.status === key ? `${val.bg} ${val.color} ring-2 ring-offset-1 ring-current` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {val.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowInterviewModal(true)} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2"><Calendar size={16} /> Agendar Entrevista</button>
                <button onClick={() => handleDelete(selectedCandidate.id)} className="bg-red-50 text-red-600 py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-red-100 transition"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-gray-900">Novo Candidato</h2>
              <button onClick={() => setShowNewCandidate(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Nome *</label><input type="text" value={newCandidate.name} onChange={e => setNewCandidate({...newCandidate, name: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Nome completo" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label><input type="email" value={newCandidate.email} onChange={e => setNewCandidate({...newCandidate, email: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="email@exemplo.com" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Telefone</label><input type="text" value={newCandidate.phone} onChange={e => setNewCandidate({...newCandidate, phone: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="(11) 99999-9999" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">LinkedIn</label><input type="text" value={newCandidate.linkedin} onChange={e => setNewCandidate({...newCandidate, linkedin: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="https://linkedin.com/in/..." /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Cidade</label><input type="text" value={newCandidate.city} onChange={e => setNewCandidate({...newCandidate, city: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Estado</label><select value={newCandidate.state} onChange={e => setNewCandidate({...newCandidate, state: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">{states.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Fonte</label><select value={newCandidate.source} onChange={e => setNewCandidate({...newCandidate, source: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"><option value="manual">Manual</option><option value="linkedin">LinkedIn</option><option value="portal">Portal</option><option value="indicação">Indicação</option><option value="email">Email</option></select></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Anos de Experiência</label><input type="number" value={newCandidate.experienceYears} onChange={e => setNewCandidate({...newCandidate, experienceYears: Number(e.target.value)})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" min={0} /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Escolaridade</label><select value={newCandidate.educationLevel} onChange={e => setNewCandidate({...newCandidate, educationLevel: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">{educationLevels.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Pretensão (R$)</label><input type="number" value={newCandidate.expectedSalary} onChange={e => setNewCandidate({...newCandidate, expectedSalary: Number(e.target.value)})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" min={0} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Disponibilidade</label><select value={newCandidate.availability} onChange={e => setNewCandidate({...newCandidate, availability: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">{availabilityOptions.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Habilidades (separadas por vírgula)</label><input type="text" value={newCandidate.tags} onChange={e => setNewCandidate({...newCandidate, tags: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="React, Node.js, SQL" /></div>
              </div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Carta de Apresentação</label><textarea rows={3} value={newCandidate.coverLetter} onChange={e => setNewCandidate({...newCandidate, coverLetter: e.target.value})} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" placeholder="Por que quer trabalhar conosco?" /></div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => setShowNewCandidate(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium">Cancelar</button>
              <button onClick={handleAddCandidate} className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 text-sm font-medium">Cadastrar Candidato</button>
            </div>
          </div>
        </div>
      )}

      {showInterviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-gray-900">Agendar Entrevista</h2>
              <button onClick={() => setShowInterviewModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Título</label><input type="text" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Ex: Entrevista Técnica" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Data/Hora</label><input type="datetime-local" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Duração (min)</label><input type="number" defaultValue={60} className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Tipo</label><select className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"><option>Videochamada</option><option>Telefone</option><option>Presencial</option><option>Teste Técnico</option></select></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Entrevistador</label><input type="text" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Nome do entrevistador" /></div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button onClick={() => setShowInterviewModal(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium">Cancelar</button>
              <button onClick={() => { setShowInterviewModal(false); showToast('Entrevista agendada com sucesso!'); }} className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-sm font-medium">Agendar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}