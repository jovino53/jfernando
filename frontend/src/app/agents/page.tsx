'use client';

import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Agent {
  type: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  capabilities: string[];
  sampleQueries: string[];
}

interface ChatMessage {
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  cards?: { title: string; value: string; sub: string; color: string }[];
  list?: { label: string; detail: string; badge?: string; badgeColor?: string }[];
}

const agents: Agent[] = [
  {
    type: 'RECRUITER', name: 'Nexus Recruiter', icon: '🎯',
    description: 'Triagem inteligente de candidatos, matching com vagas e otimização do processo seletivo',
    color: 'text-purple-600', gradient: 'from-purple-500 to-indigo-600',
    capabilities: ['Análise de currículos', 'Matching candidato/vaga', 'Perguntas de entrevista', 'Score de compatibilidade', 'Resumo de perfil'],
    sampleQueries: ['Analise o currículo do João Silva para a vaga de Dev React', 'Quais candidatos são os melhores para a vaga de Gerente de TI?', 'Gere perguntas técnicas para entrevista de Dev Frontend'],
  },
  {
    type: 'TALENT', name: 'Nexus Talent', icon: '⭐',
    description: 'Identificação de talentos, análise de risco de turnover e planejamento de sucessão',
    color: 'text-blue-600', gradient: 'from-blue-500 to-cyan-600',
    capabilities: ['Top performers', 'Flight risk analysis', 'Succession planning', '9-box grid', 'Potencial de liderança'],
    sampleQueries: ['Quem são os top 3 talentos com maior potencial de liderança?', 'Quais colaboradores têm risco alto de turnover?', 'Monte um mapa de sucessão para o departamento de TI'],
  },
  {
    type: 'LEARNING', name: 'Nexus Learning', icon: '📚',
    description: 'Recomendações personalizadas de treinamento e desenvolvimento de carreira',
    color: 'text-green-600', gradient: 'from-green-500 to-emerald-600',
    capabilities: ['Gap analysis', 'Trilhas de aprendizado', 'Recomendação de cursos', 'Plano de desenvolvimento', 'ROI de treinamentos'],
    sampleQueries: ['Quais gaps de skills existem no time de TI?', 'Crie uma trilha de aprendizado para Ana virar Diretora de Marketing', 'Qual ROI estimado do treinamento de liderança?'],
  },
  {
    type: 'LEADERSHIP', name: 'Nexus Leadership', icon: '👔',
    description: 'Coaching inteligente para gestores, dinâmica de equipe e resolução de conflitos',
    color: 'text-orange-600', gradient: 'from-orange-500 to-red-500',
    capabilities: ['Coaching 1:1', 'Resolução de conflitos', 'Engajamento de equipe', 'Feedback estruturado', 'Diagnóstico de time'],
    sampleQueries: ['Como melhorar o engajamento da equipe de Marketing?', 'Me ajude a dar feedback negativo para um colaborador', 'Diagnóstico da dinâmica do time comercial'],
  },
];

const generateResponse = (agentType: string, query: string): ChatMessage => {
  const responses: Record<string, Record<string, any>> = {
    RECRUITER: {
      default: {
        content: `Análise concluída para: "${query}"\n\nBaseado na análise do perfil e requisitos da vaga, identifiquei os seguintes pontos:`,
        cards: [
          { title: 'Compatibilidade', value: '87%', sub: 'Score alto', color: 'text-green-600' },
          { title: 'Experiência', value: '6 anos', sub: 'Acima da média', color: 'text-blue-600' },
          { title: 'Fit Cultural', value: 'Alto', sub: 'Equipe remote-first', color: 'text-purple-600' },
          { title: 'Disponibilidade', value: 'Imediata', sub: '30 dias aviso', color: 'text-amber-600' },
        ],
        list: [
          { label: '匹配 React.js', detail: '5 anos de experiência, projetos relevantes', badge: 'Forte', badgeColor: 'bg-green-100 text-green-700' },
          { label: 'TypeScript', detail: '3 anos, uso em produção', badge: 'Bom', badgeColor: 'bg-blue-100 text-blue-700' },
          { label: 'Liderança Técnica', detail: 'Mentoria de 2 devs júnior', badge: 'Médio', badgeColor: 'bg-yellow-100 text-yellow-700' },
          { label: 'Comunicação', detail: 'Apresentou em 2 meetups', badge: 'Bom', badgeColor: 'bg-blue-100 text-blue-700' },
          { label: 'AWS/Cloud', detail: 'Certificação em andamento', badge: 'Em desenvolvimento', badgeColor: 'bg-gray-100 text-gray-600' },
        ],
      },
    },
    TALENT: {
      default: {
        content: `Análise de talentos concluída: "${query}"\n\nIdentifiquei os seguintes insights sobre o capital humano:`,
        cards: [
          { title: 'Top Talent', value: '12', sub: 'Acima de 90pts', color: 'text-green-600' },
          { title: 'Em Risco', value: '5', sub: 'Alta probabilidade', color: 'text-red-600' },
          { title: 'Prontos p/ Promoção', value: '8', sub: 'Próximo ciclo', color: 'text-blue-600' },
          { title: 'Potencial Alto', value: '15', sub: 'Desenvolver', color: 'text-purple-600' },
        ],
        list: [
          { label: 'Maria Santos', detail: 'Gerente RH — Pronta para Head de People Ops', badge: 'Top 1%', badgeColor: 'bg-green-100 text-green-700' },
          { label: 'Fernanda Lima', detail: 'Dev Senior — Candidata Staff Engineer', badge: 'Top 5%', badgeColor: 'bg-green-100 text-green-700' },
          { label: 'Ana Oliveira', detail: 'Coord. Marketing — Candidata Diretora', badge: 'Top 3%', badgeColor: 'bg-green-100 text-green-700' },
          { label: 'Ricardo Pereira', detail: 'Contador — RISCO ALTO de desligamento', badge: 'Crítico', badgeColor: 'bg-red-100 text-red-700' },
          { label: 'Pedro Costa', detail: 'Analista Financeiro — Potencial médio', badge: 'Desenvolver', badgeColor: 'bg-yellow-100 text-yellow-700' },
        ],
      },
    },
    LEARNING: {
      default: {
        content: `Análise de desenvolvimento: "${query}"\n\nCom base nos gaps identificados e objetivos de carreira:`,
        cards: [
          { title: 'Gaps Identificados', value: '23', sub: 'Em 8 colaboradores', color: 'text-amber-600' },
          { title: 'Treinamentos Recomendados', value: '15', sub: 'Alto impacto', color: 'text-green-600' },
          { title: 'Investimento Estimado', value: 'R$45k', sub: 'Próximos 12 meses', color: 'text-blue-600' },
          { title: 'ROI Estimado', value: '3.2x', sub: 'Retorno em 18 meses', color: 'text-purple-600' },
        ],
        list: [
          { label: 'Liderança Técnica', detail: 'João Silva, Fernanda Lima — 82% do time TI precisa', badge: 'Crítico', badgeColor: 'bg-red-100 text-red-700' },
          { label: 'People Analytics', detail: 'Juliana Mendes, equipe RH — gap de dados', badge: 'Alto', badgeColor: 'bg-orange-100 text-orange-700' },
          { label: 'Comunicação Executiva', detail: 'Pedro Costa, Ana Oliveira — para promoção', badge: 'Médio', badgeColor: 'bg-yellow-100 text-yellow-700' },
          { label: 'UX Research', detail: 'Carlos Souza — transição UI→UX', badge: 'Médio', badgeColor: 'bg-yellow-100 text-yellow-700' },
          { label: 'Automação Contábil', detail: 'Ricardo Pereira — urgente para retenção', badge: 'URGENTE', badgeColor: 'bg-red-100 text-red-700 animate-pulse' },
        ],
      },
    },
    LEADERSHIP: {
      default: {
        content: `Diagnóstico de liderança: "${query}"\n\nAnalisei os dados da equipe e identifiquei as seguintes oportunidades:`,
        cards: [
          { title: 'Engajamento Médio', value: '3.8/5', sub: '+0.3 vs semestre', color: 'text-green-600' },
          { title: 'Satisfação Gestor', value: '4.1/5', sub: 'Acima da média', color: 'text-blue-600' },
          { title: 'Conflitos Ativos', value: '2', sub: '1 resolvível', color: 'text-amber-600' },
          { title: 'eNPS', value: '+42', sub: 'Bom', color: 'text-green-600' },
        ],
        list: [
          { label: 'Falta de Reconhecimento', detail: '3 colaboradores mencionaram — ação imediata', badge: 'Prioridade', badgeColor: 'bg-red-100 text-red-700' },
          { label: 'Reuniões Excessivas', detail: 'Média de 18h/semana em reuniões — reduzir 30%', badge: 'Atenção', badgeColor: 'bg-yellow-100 text-yellow-700' },
          { label: 'Work-life Balance', detail: 'Departamento TI com 12h extras/semana — burnout risk', badge: 'Alerta', badgeColor: 'bg-orange-100 text-orange-700' },
          { label: 'Comunicação Assíncrona', detail: 'Implementar async-first — ganho estimado de 6h/semana', badge: 'Oportunidade', badgeColor: 'bg-green-100 text-green-700' },
          { label: '1:1s Ineficazes', detail: '40% dos gestores não realizam 1:1s semanais', badge: 'Melhorar', badgeColor: 'bg-blue-100 text-blue-700' },
        ],
      },
    },
  };

  const agentResponse = responses[agentType]?.default || responses.RECRUITER.default;
  return {
    role: 'agent',
    content: agentResponse.content,
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    cards: agentResponse.cards,
    list: agentResponse.list,
  };
};

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentAgent = agents.find((a) => a.type === selectedAgent);
  const currentChat = selectedAgent ? chats[selectedAgent] || [] : [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat]);

  const handleSend = async (query?: string) => {
    const q = query || input.trim();
    if (!q || !selectedAgent) return;

    const userMsg: ChatMessage = {
      role: 'user', content: q,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setChats((prev) => ({ ...prev, [selectedAgent]: [...(prev[selectedAgent] || []), userMsg] }));
    setInput('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const agentMsg = generateResponse(selectedAgent, q);
    setChats((prev) => ({ ...prev, [selectedAgent]: [...(prev[selectedAgent] || []), agentMsg] }));
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {!selectedAgent ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Agentes IA</h1>
                <p className="text-sm text-gray-500 mt-1">Assistentes inteligentes especializados em diferentes áreas de RH</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {agents.map((agent) => (
                  <div key={agent.type} onClick={() => setSelectedAgent(agent.type)}
                    className="bg-white rounded-2xl shadow-sm p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.01] border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-2xl text-white shadow-lg`}>{agent.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">{agent.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{agent.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {agent.capabilities.map((cap) => (
                        <span key={cap} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{cap}</span>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-400 mb-2">Experimente perguntar:</p>
                      <div className="space-y-1.5">
                        {agent.sampleQueries.slice(0, 2).map((q, i) => (
                          <p key={i} className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg italic">"{q}"</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex gap-6 h-full">
              <div className="w-72 flex-shrink-0 space-y-3">
                <button onClick={() => setSelectedAgent(null)} className="text-sm text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-1">&larr; Voltar</button>
                {agents.map((agent) => (
                  <button key={agent.type} onClick={() => setSelectedAgent(agent.type)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${selectedAgent === agent.type ? `bg-gradient-to-r ${agent.gradient} text-white shadow-lg` : 'bg-white hover:bg-gray-100 shadow-sm'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{agent.icon}</span>
                      <div>
                        <p className={`font-medium text-sm ${selectedAgent === agent.type ? 'text-white' : 'text-gray-900'}`}>{agent.name}</p>
                        <p className={`text-xs ${selectedAgent === agent.type ? 'text-white/70' : 'text-gray-400'}`}>{(chats[agent.type] || []).length} msgs</p>
                      </div>
                    </div>
                  </button>
                ))}
                {currentAgent && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Capacidades</p>
                    <div className="space-y-1.5">
                      {currentAgent.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2 text-xs text-gray-600">
                          <span className="w-1 h-1 bg-primary-500 rounded-full"></span>{cap}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
                <div className={`p-4 bg-gradient-to-r ${currentAgent?.gradient} text-white`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currentAgent?.icon}</span>
                    <div>
                      <h2 className="font-bold">{currentAgent?.name}</h2>
                      <p className="text-sm text-white/70">{currentAgent?.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {currentChat.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">{currentAgent?.icon}</div>
                      <h3 className="font-semibold text-gray-700 mb-2">Olá! Sou o {currentAgent?.name}</h3>
                      <p className="text-sm text-gray-500 mb-6">Como posso ajudar você hoje?</p>
                      <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                        {currentAgent?.sampleQueries.map((q, i) => (
                          <button key={i} onClick={() => handleSend(q)}
                            className="text-xs bg-gray-100 hover:bg-primary-50 hover:text-primary-700 text-gray-600 px-3 py-2 rounded-lg transition text-left">{q}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentChat.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                        {msg.role === 'agent' && (
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-sm">{currentAgent?.icon}</span>
                            <span className="text-xs font-medium text-gray-500">{currentAgent?.name}</span>
                            <span className="text-xs text-gray-400">{msg.timestamp}</span>
                          </div>
                        )}
                        <div className={`rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'}`}>
                          <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        </div>

                        {msg.cards && (
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {msg.cards.map((card, ci) => (
                              <div key={ci} className="bg-white border rounded-xl p-3 shadow-sm">
                                <p className="text-[10px] text-gray-400 uppercase">{card.title}</p>
                                <p className={`text-lg font-bold ${card.color}`}>{card.value}</p>
                                <p className="text-[10px] text-gray-400">{card.sub}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {msg.list && (
                          <div className="mt-3 space-y-1.5">
                            {msg.list.map((item, li) => (
                              <div key={li} className="bg-white border rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-700">{item.label}</p>
                                  <p className="text-[10px] text-gray-400 truncate">{item.detail}</p>
                                </div>
                                {item.badge && <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 ${item.badgeColor}`}>{item.badge}</span>}
                              </div>
                            ))}
                          </div>
                        )}

                        {msg.role === 'user' && <p className="text-xs text-gray-400 mt-1 text-right">{msg.timestamp}</p>}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm">{currentAgent?.icon}</span>
                          <span className="text-xs font-medium text-gray-500">{currentAgent?.name}</span>
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t bg-gray-50">
                  <div className="flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={`Pergunte ao ${currentAgent?.name}...`}
                      className="flex-1 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    <button onClick={() => handleSend()} disabled={loading || !input.trim()}
                      className={`bg-gradient-to-r ${currentAgent?.gradient} text-white px-5 py-2.5 rounded-xl font-medium text-sm disabled:opacity-50 hover:shadow-lg transition`}>
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
