'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Search, BookOpen, FileText, Download, Eye, Star, Clock, Tag, Filter, Plus, ChevronRight, Lightbulb, HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Todos', icon: '📚', count: 24 },
  { id: 'policies', name: 'Políticas', icon: '📋', count: 8 },
  { id: 'procedures', name: 'Procedimentos', icon: '📝', count: 6 },
  { id: 'benefits', name: 'Benefícios', icon: '🎁', count: 4 },
  { id: 'onboarding', name: 'Onboarding', icon: '🚀', count: 3 },
  { id: 'compliance', name: 'Compliance', icon: '⚖️', count: 2 },
  { id: 'training', name: 'Treinamentos', icon: '🎓', count: 1 },
];

const articles = [
  {
    id: 1,
    title: 'Política de Home Office 2026',
    category: 'policies',
    views: 1245,
    rating: 4.8,
    lastUpdated: '15/07/2026',
    author: 'RH',
    tags: ['trabalho remoto', 'flexibilidade', 'produtividade'],
    featured: true,
    content: 'A empresa adota modelo híbrido com até 3 dias remotos por semana...'
  },
  {
    id: 2,
    title: 'Como Solicitar Férias no Sistema',
    category: 'procedures',
    views: 1189,
    rating: 4.6,
    lastUpdated: '10/07/2026',
    author: 'RH',
    tags: ['férias', 'sistema', 'aprovação'],
    featured: true,
    content: 'Acesse o portal do colaborador, selecione "Solicitar Férias"...'
  },
  {
    id: 3,
    title: 'Plano de Benefícios 2026',
    category: 'benefits',
    views: 2312,
    rating: 4.9,
    lastUpdated: '01/07/2026',
    author: 'Benefícios',
    tags: ['plano de saúde', 'odontológico', 'vale-refeição'],
    featured: true,
    content: 'Conheça todos os benefícios disponíveis para colaboradores...'
  },
  {
    id: 4,
    title: 'Guia Completo de Onboarding',
    category: 'onboarding',
    views: 1156,
    rating: 4.7,
    lastUpdated: '05/07/2026',
    author: 'RH',
    tags: ['integração', 'primeiros dias', 'treinamento'],
    featured: false,
    content: 'Seu primeiro dia na empresa: o que esperar e como se preparar...'
  },
  {
    id: 5,
    title: 'Política de Uso de TI e Segurança',
    category: 'policies',
    views: 998,
    rating: 4.3,
    lastUpdated: '20/06/2026',
    author: 'TI',
    tags: ['segurança', 'senhas', 'dispositivos'],
    featured: false,
    content: 'Regras para uso de equipamentos e dados da empresa...'
  },
  {
    id: 6,
    title: 'Código de Conduta Ética',
    category: 'compliance',
    views: 876,
    rating: 4.5,
    lastUpdated: '01/06/2026',
    author: 'Jurídico',
    tags: ['ética', 'conduta', 'denúncias'],
    featured: false,
    content: 'Princípios éticos e canais de comunicação para dúvidas...'
  },
  {
    id: 7,
    title: 'Programa de Desenvolvimento Profissional',
    category: 'training',
    views: 754,
    rating: 4.4,
    lastUpdated: '25/06/2026',
    author: 'Talentos',
    tags: ['carreira', 'capacitação', 'mentoria'],
    featured: false,
    content: 'Trilhas de desenvolvimento e oportunidades de crescimento...'
  },
  {
    id: 8,
    title: 'Política de Licenças e Afastamentos',
    category: 'policies',
    views: 654,
    rating: 4.2,
    lastUpdated: '15/06/2026',
    author: 'RH',
    tags: ['licença', 'afastamento', 'atestado'],
    featured: false,
    content: 'Tipos de licenças disponíveis e como solicitá-las...'
  },
  {
    id: 9,
    title: 'Procedimento de Abertura de Chamado TI',
    category: 'procedures',
    views: 567,
    rating: 4.1,
    lastUpdated: '10/06/2026',
    author: 'TI',
    tags: ['suporte', 'chamado', 'helpdesk'],
    featured: false,
    content: 'Como abrir e acompanhar chamados de suporte técnico...'
  },
];

const recentViews = [
  { title: 'Política de Home Office', date: 'Hoje, 14:30' },
  { title: 'Plano de Benefícios 2026', date: 'Hoje, 10:15' },
  { title: 'Guia de Onboarding', date: 'Ontem, 16:45' },
];

const popularArticles = [
  { title: 'Plano de Benefícios 2026', views: 2312 },
  { title: 'Política de Home Office', views: 1245 },
  { title: 'Como Solicitar Férias', views: 1189 },
];

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [toast, setToast] = useState('');
  const [showNewArticle, setShowNewArticle] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(a => a.featured);

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
              <h1 className="text-2xl font-bold text-gray-900">Base de Conhecimento</h1>
              <p className="text-sm text-gray-500 mt-1">Políticas, procedimentos e guias para colaboradores</p>
            </div>
            <button onClick={() => setShowNewArticle(true)} className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2">
              <Plus size={16} /> Novo Artigo
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Encontre o que precisa</h2>
                <p className="text-primary-100 text-sm mb-4">Busque por políticas, procedimentos ou benefícios</p>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar artigos, políticas, procedimentos..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">📖 Artigos em Destaque</h3>
              <div className="space-y-3">
                {featuredArticles.slice(0, 3).map((article) => (
                  <div key={article.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition cursor-pointer">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{article.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-[10px] text-gray-500">{article.rating}</span>
                      <span className="text-[10px] text-gray-400">•</span>
                      <span className="text-[10px] text-gray-500">{article.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-4">
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${selectedCategory === cat.id ? 'bg-primary-100 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'bg-white text-gray-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'bg-white text-gray-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition group cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-2.5 py-1 text-[10px] font-medium bg-primary-100 text-primary-700 rounded-full">
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                        {article.featured && <span className="text-amber-500">⭐</span>}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{article.content}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {article.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><Eye size={12} /> {article.views}</span>
                          <span className="flex items-center gap-1"><Star size={12} className="text-amber-500" /> {article.rating}</span>
                        </div>
                        <span>{article.lastUpdated}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm divide-y">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="p-4 hover:bg-gray-50 transition cursor-pointer flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{article.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">{categories.find(c => c.id === article.category)?.name}</span>
                          <span className="text-[10px] text-gray-400">{article.lastUpdated}</span>
                          <span className="text-[10px] text-gray-400">{article.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Eye size={14} /> {article.views}</span>
                        <span className="flex items-center gap-1"><Star size={14} className="text-amber-500" /> {article.rating}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">🕐 Visualizados Recentemente</h3>
                <div className="space-y-2">
                  {recentViews.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <Clock size={14} className="text-gray-400" />
                      <div>
                        <p className="text-xs font-medium text-gray-700">{item.title}</p>
                        <p className="text-[10px] text-gray-400">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">🔥 Mais Populares</h3>
                <div className="space-y-2">
                  {popularArticles.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <span className="text-xs font-medium text-gray-700">{item.title}</span>
                      <span className="text-[10px] text-gray-400">{item.views} views</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={16} className="text-amber-600" />
                  <h3 className="font-semibold text-amber-800 text-sm">Dica da IA</h3>
                </div>
                <p className="text-xs text-amber-700">Baseado nas suas buscas recentes, recomendamos ler a <strong>Política de Home Office</strong> e o <strong>Guia de Onboarding</strong>.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">📊 Estatísticas</h3>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Total de Artigos</span><span className="text-xs font-medium">24</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Visualizações Totais</span><span className="text-xs font-medium">12.450</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Avaliação Média</span><span className="text-xs font-medium">4.6/5</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Última Atualização</span><span className="text-xs font-medium">15/07/2026</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showNewArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-gray-900">Novo Artigo</h2>
              <button onClick={() => setShowNewArticle(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Título *</label><input type="text" placeholder="Ex: Política de ..." className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Categoria</label><select className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"><option>Políticas</option><option>Procedimentos</option><option>Benefícios</option><option>Onboarding</option><option>Compliance</option><option>Treinamentos</option></select></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1 block">Autor</label><input type="text" placeholder="Ex: RH" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
              </div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Tags (separadas por vírgula)</label><input type="text" placeholder="Ex: política, benefícios, 2026" className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1 block">Conteúdo *</label><textarea rows={6} placeholder="Escreva o conteúdo do artigo aqui..." className="w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" /></div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button onClick={() => setShowNewArticle(false)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 text-sm font-medium">Cancelar</button>
              <button onClick={() => { setShowNewArticle(false); showToast('Artigo criado com sucesso!'); }} className="px-5 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 text-sm font-medium">Publicar Artigo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}