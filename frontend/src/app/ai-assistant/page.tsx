'use client';

import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Send, Bot, User, Mic, Copy, Download, Sparkles, Brain, Users, BarChart3, Lightbulb, MessageSquare } from 'lucide-react';

const suggestedQuestions = [
  { category: 'Desempenho', questions: ['Quais colaboradores estão com desempenho abaixo da meta?', 'Como calcular o bônus de performance?', 'Gerar relatório de avaliações do Q2'] },
  { category: 'Clima', questions: ['Resumo da última pesquisa de clima', 'Pontos fracos identificados no surveys', 'Sugestões para melhorar o eNPS'] },
  { category: 'Retenção', questions: ['Quem são os flight risks atuais?', 'Estratégias para reduzir turnover', 'Análise de motivos de desligamento'] },
  { category: 'Talentos', questions: ['Quem são os HiPos da empresa?', 'Plano de sucessão para cargos de liderança', 'Gap de skills do time de TI'] },
];

const aiPersonas = [
  { id: 'hr', name: 'Assistente RH', icon: '🤖', color: 'bg-primary-100 text-primary-700', description: 'Especialista em gestão de pessoas' },
  { id: 'recruiter', name: 'Recrutador IA', icon: '🎯', color: 'bg-purple-100 text-purple-700', description: 'Focado em recrutamento e seleção' },
  { id: 'analytics', name: 'Analista de Dados', icon: '📊', color: 'bg-blue-100 text-blue-700', description: 'Especialista em people analytics' },
  { id: 'climate', name: 'Especialista Clima', icon: '🌡️', color: 'bg-orange-100 text-orange-700', description: 'Focado em clima organizacional' },
];

const predefinedResponses: Record<string, string> = {
  'Quais colaboradores estão com desempenho abaixo da meta?': '📊 **Análise de Desempenho Abaixo da Meta**\n\nIdentifiquei 4 colaboradores com desempenho abaixo da meta no último ciclo:\n\n1. **Pedro Costa** (Financeiro) - Nota: 6.5/10\n   - Principal dificuldade: Gestão de tempo\n   - Sugestão: Treinamento de produtividade\n\n2. **Ricardo Pereira** (Financeiro) - Nota: 6.8/10\n   - Principal dificuldade: Comunicação com equipe\n   - Sugestão: Workshop de liderança\n\n3. **Carlos Souza** (Marketing) - Nota: 7.2/10\n   - Principal dificuldade: Habilidades técnicas\n   - Sugestão: Capacitação em ferramentas\n\n4. **João Silva** (TI) - Nota: 7.5/10\n   - Principal dificuldade: Proatividade\n   - Sugestão: Plano de desenvolvimento individual\n\n**Recomendação:** Agendar reuniões 1:1 para alinhar expectativas e criar planos de ação.',
  
  'Quem são os HiPos da empresa?': '⭐ **Colaboradores de Alto Potencial (HiPos)**\n\nCom base nas avaliações de performance e potencial, identifiquei 5 HiPos:\n\n1. **Maria Santos** (RH) - Score: 95/100\n   - Potencial: Liderança sênior\n   - Próximo papel: Gerente de People Ops\n\n2. **Ana Oliveira** (Marketing) - Score: 90/100\n   - Potencial: Diretora de Marketing\n   - Próximo papel: Head de Marketing\n\n3. **Fernanda Lima** (TI) - Score: 88/100\n   - Potencial: Tech Lead\n   - Próximo papel: Staff Engineer\n\n4. **João Silva** (TI) - Score: 82/100\n   - Potencial: Liderança técnica\n   - Próximo papel: Tech Lead\n\n5. **Juliana Mendes** (RH) - Score: 78/100\n   - Potencial: Coordenadora RH\n   - Próximo papel: Head de People Ops\n\n**Ação recomendada:** Criar planos de desenvolvimento acelerado e programas de mentoria.',
  
  'Quem são os flight risks atuais?': '⚠️ **Flight Risks Identificados**\n\nCom base em análise preditiva, 2 colaboradores apresentam risco elevado de desligamento:\n\n1. **Ricardo Pereira** (Financeiro) - Risco: 75%\n   - Motivos: Falta de reconhecimento, salário abaixo do mercado\n   - Ação: Reunião urgente com gestor + proposta de reajuste\n   - Timeline: 2 semanas\n\n2. **Pedro Costa** (Financeiro) - Risco: 45%\n   - Motivos: Falta de crescimento, poucas oportunidades\n   - Ação: Plano de desenvolvimento + novo projeto\n   - Timeline: 1 mês\n\n**Recomendação:** Ação imediata para Ricardo. Para Pedro, criar plano de carreira atrativo.',
  
  'Resumo da última pesquisa de clima': '🌡️ **Resumo da Pesquisa de Clima - Julho 2026**\n\n**Métricas Principais:**\n- eNPS: +32 (Bom)\n- Participação: 87%\n- Satisfação Geral: 8.2/10\n\n**Pontos Fortes:**\n✅ Cultura organizacional (9.1/10)\n✅ Relacionamento com colegas (8.8/10)\n✅ Missão da empresa (8.5/10)\n\n**Pontos de Atenção:**\n⚠️ Comunicação da liderança (6.8/10)\n⚠️ Oportunidades de crescimento (6.5/10)\n⚠️ Reconhecimento (6.9/10)\n\n**Insights da IA:**\n1. Focar em programas de reconhecimento\n2. Melhorar canais de comunicação da liderança\n3. Criar trilhas de carreira mais claras',
};

type ChatMessage =
  | { role: 'assistant'; content: string; persona: string; timestamp: Date }
  | { role: 'user'; content: string; persona?: string; timestamp: Date };

export default function AiAssistantPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente de IA do Nexus RH AI. Como posso ajudá-lo hoje?', persona: 'hr', timestamp: new Date() },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('hr');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const sendMessage = text || message;
    if (!sendMessage.trim()) return;

    setMessages([...messages, { role: 'user', content: sendMessage, timestamp: new Date() }]);
    setMessage('');
    setIsTyping(true);
    setShowSuggestions(false);

    setTimeout(() => {
      const response = predefinedResponses[sendMessage] || 
        `Entendi sua pergunta sobre "${sendMessage}". Como assistente de IA, posso ajudá-lo com:\n\n• Análise de dados de RH\n• Relatórios de desempenho\n• Sugestões de melhoria\n• Insights sobre clima organizacional\n\nPor favor, reformule sua pergunta ou escolha uma das sugestões abaixo.`;
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response, persona: selectedPersona, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex flex-col p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Assistente IA para RH</h1>
              <p className="text-sm text-gray-500 mt-1">Inteligência artificial especializada em gestão de pessoas</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2">
                <Download size={16} /> Exportar Chat
              </button>
            </div>
          </div>

          <div className="flex gap-4 flex-1 overflow-hidden">
            <div className="w-64 bg-white rounded-2xl shadow-sm p-4 flex flex-col">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Persona da IA</h3>
              <div className="space-y-2">
                {aiPersonas.map((persona) => (
                  <button key={persona.id} onClick={() => setSelectedPersona(persona.id)}
                    className={`w-full text-left p-3 rounded-xl transition ${selectedPersona === persona.id ? `${persona.color} ring-2 ring-offset-2 ring-current` : 'bg-gray-50 hover:bg-gray-100'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{persona.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{persona.name}</p>
                        <p className="text-[10px] opacity-70">{persona.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">Sugestões Rápidas</h3>
                <div className="space-y-3">
                  {suggestedQuestions.map((cat, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-medium text-gray-500 uppercase mb-1">{cat.category}</p>
                      {cat.questions.slice(0, 2).map((q, qi) => (
                        <button key={qi} onClick={() => handleSuggestionClick(q)}
                          className="w-full text-left text-xs text-gray-600 hover:text-primary-600 hover:bg-primary-50 p-2 rounded-lg transition mb-1">
                          {q}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-2xl ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.role === 'user' ? 'bg-primary-100 text-primary-700' : 
                          aiPersonas.find(p => p.id === msg.persona)?.color || 'bg-gray-100'
                        }`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`px-4 py-3 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-primary-600 text-white rounded-br-sm' 
                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                          <div className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-primary-200' : 'text-gray-400'}`}>
                            {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        {msg.role === 'assistant' && (
                          <button className="text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition">
                            <Copy size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
                        <Bot size={16} />
                      </div>
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4">
                {showSuggestions && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {suggestedQuestions[0].questions.slice(0, 3).map((q, i) => (
                      <button key={i} onClick={() => handleSuggestionClick(q)}
                        className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full hover:bg-primary-100 transition">
                        {q}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <button className="bg-gray-100 text-gray-600 p-3 rounded-xl hover:bg-gray-200 transition">
                    <Mic size={20} />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Digite sua pergunta sobre RH..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!message.trim() || isTyping}
                    className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                  >
                    <Send size={18} /> Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
