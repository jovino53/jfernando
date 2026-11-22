'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface EmployeeIntelligence {
  id: number;
  name: string;
  department: string;
  position: string;
  admissionDate: string;
  aiSummary: string;
  competencies: { name: string; score: number }[];
  personality: { trait: string; value: number; description: string }[];
  strengths: string[];
  improvements: string[];
  leadershipPotential: number;
  retentionRisk: number;
  riskLabel: 'Baixo' | 'Médio' | 'Alto';
  performanceHistory: { month: string; score: number }[];
  developmentPlan: { goal: string; deadline: string; status: 'Concluído' | 'Em andamento' | 'Pendente' }[];
  trainings: { name: string; status: string; impact: string }[];
  careerPath: { current: string; next: string; timeline: string };
  workStyle: { preference: string; value: string }[];
}

const employees: EmployeeIntelligence[] = [
  {
    id: 1, name: 'João Silva', department: 'TI', position: 'Desenvolvedor', admissionDate: '2022-03-15',
    aiSummary: 'Desenvolvedor altamente técnico com excelente domínio de React e Node.js. Demonstra proatividade em resolver problemas complexos e tem potencial claro para liderança técnica. Recomenda-se exposição a projetos de arquitetura para acelerar crescimento.',
    competencies: [
      { name: 'JavaScript/TypeScript', score: 92 },
      { name: 'React.js', score: 95 },
      { name: 'Node.js', score: 88 },
      { name: 'Banco de Dados', score: 75 },
      { name: 'DevOps', score: 70 },
      { name: 'Liderança', score: 65 },
      { name: 'Comunicação', score: 72 },
      { name: 'Gestão de Projetos', score: 58 },
    ],
    personality: [
      { trait: 'Analítico', value: 90, description: 'Decisões baseadas em dados e lógica' },
      { trait: 'Colaborativo', value: 78, description: 'Trabalha bem em equipe, mas prefere autonomia' },
      { trait: 'Inovador', value: 85, description: 'Busca soluções criativas e alternativas' },
      { trait: 'Detalhista', value: 88, description: 'Atenção minuciosa a qualidade do código' },
      { trait: 'Resiliente', value: 72, description: 'Lida bem com pressão, mas pode melhorar tolerância a frustração' },
    ],
    strengths: ['Dominio técnico excepcional', 'Resolução de problemas complexos', 'Iniciativa e proatividade', 'Código limpo e documentado'],
    improvements: ['Comunicação com stakeholders não-técnicos', 'Delegação de tarefas', 'Visão de negócio'],
    leadershipPotential: 78, retentionRisk: 35, riskLabel: 'Baixo',
    performanceHistory: [
      { month: 'Jan', score: 82 }, { month: 'Fev', score: 85 }, { month: 'Mar', score: 83 },
      { month: 'Abr', score: 88 }, { month: 'Mai', score: 90 }, { month: 'Jun', score: 87 },
      { month: 'Jul', score: 91 }, { month: 'Ago', score: 89 }, { month: 'Set', score: 92 },
      { month: 'Out', score: 90 }, { month: 'Nov', score: 93 }, { month: 'Dez', score: 91 },
    ],
    developmentPlan: [
      { goal: 'Liderar projeto de migração de microservices', deadline: '2026-Q2', status: 'Em andamento' },
      { goal: 'Certificação AWS Solutions Architect', deadline: '2026-Q3', status: 'Pendente' },
      { goal: 'Mentoria de 2 devs júnior', deadline: '2026-Q1', status: 'Concluído' },
    ],
    trainings: [
      { name: 'Liderança Técnica Avançada', status: 'Recomendado', impact: 'Alto' },
      { name: 'Arquitetura de Microsserviços', status: 'Em andamento', impact: 'Alto' },
      { name: 'Comunicação Executiva', status: 'Recomendado', impact: 'Médio' },
    ],
    careerPath: { current: 'Desenvolvedor Pleno', next: 'Tech Lead', timeline: '12-18 meses' },
    workStyle: [
      { preference: 'Ambiente', value: 'Remoto' },
      { preference: 'Horário', value: 'Flexível' },
      { preference: 'Comunicação', value: 'Assíncrona' },
      { preference: 'Feedback', value: 'Direto e técnico' },
    ],
  },
  {
    id: 2, name: 'Maria Santos', department: 'RH', position: 'Gerente', admissionDate: '2021-01-10',
    aiSummary: 'Líder excepcional com visão estratégica e empatia natural. Gestora de alto impacto que transformou a cultura organizacional do departamento. Pronta para papéis de direção. Forte candidata a Head de People Operations.',
    competencies: [
      { name: 'Liderança', score: 96 },
      { name: 'Comunicação', score: 94 },
      { name: 'Gestão de Pessoas', score: 92 },
      { name: 'Mediação', score: 88 },
      { name: 'Estratégia', score: 85 },
      { name: 'TI/RH', score: 72 },
      { name: 'Dados/Analytics', score: 68 },
      { name: 'Inovação', score: 80 },
    ],
    personality: [
      { trait: 'Empático', value: 95, description: 'Conexão genuína com as pessoas' },
      { trait: 'Estratégico', value: 88, description: 'Pensa a longo prazo e conecta visão com execução' },
      { trait: 'Inspirador', value: 92, description: 'Motiva e engaja a equipe' },
      { trait: 'Decisivo', value: 85, description: 'Toma decisões rapidamente com informações disponíveis' },
      { trait: 'Adaptável', value: 90, description: 'Flexível a mudanças organizacionais' },
    ],
    strengths: ['Visão estratégica', 'Engajamento de equipe', 'Resolução de conflitos', 'Cultura organizacional'],
    improvements: ['Análise de dados avançada', 'Gestão financeira de folha', 'Automação de processos RH'],
    leadershipPotential: 95, retentionRisk: 15, riskLabel: 'Baixo',
    performanceHistory: [
      { month: 'Jan', score: 90 }, { month: 'Fev', score: 91 }, { month: 'Mar', score: 93 },
      { month: 'Abr', score: 92 }, { month: 'Mai', score: 94 }, { month: 'Jun', score: 95 },
      { month: 'Jul', score: 93 }, { month: 'Ago', score: 96 }, { month: 'Set', score: 94 },
      { month: 'Out', score: 95 }, { month: 'Nov', score: 97 }, { month: 'Dez', score: 96 },
    ],
    developmentPlan: [
      { goal: 'Programa de liderança executiva', deadline: '2026-Q2', status: 'Em andamento' },
      { goal: 'MBA em Gestão de Pessoas', deadline: '2026-Q4', status: 'Em andamento' },
      { goal: 'Apresentação no Fórum de RH', deadline: '2026-Q1', status: 'Concluído' },
    ],
    trainings: [
      { name: 'People Analytics Avançado', status: 'Recomendado', impact: 'Alto' },
      { name: 'Gestão Financeira para RH', status: 'Inscrita', impact: 'Médio' },
      { name: 'Coaching Executivo', status: 'Concluído', impact: 'Alto' },
    ],
    careerPath: { current: 'Gerente de RH', next: 'Head de People Operations', timeline: '6-12 meses' },
    workStyle: [
      { preference: 'Ambiente', value: 'Híbrido' },
      { preference: 'Horário', value: 'Comercial' },
      { preference: 'Comunicação', value: 'Síncrona' },
      { preference: 'Feedback', value: 'Coaching' },
    ],
  },
  {
    id: 3, name: 'Pedro Costa', department: 'Financeiro', position: 'Analista', admissionDate: '2023-06-01',
    aiSummary: 'Analista financeiro metódico e confiável. Excelente em modelagem e relatórios. Precisa desenvolver habilidades de apresentação para impactar decisões estratégicas. Potencial para coordenador em 18-24 meses.',
    competencies: [
      { name: 'Excel/Planilhas', score: 95 },
      { name: 'Contabilidade', score: 88 },
      { name: 'Análise Financeira', score: 85 },
      { name: 'Power BI', score: 78 },
      { name: 'SAP', score: 72 },
      { name: 'Comunicação', score: 55 },
      { name: 'Liderança', score: 48 },
      { name: 'Inovação', score: 62 },
    ],
    personality: [
      { trait: 'Metódico', value: 92, description: 'Processos estruturados e organizados' },
      { trait: 'Analítico', value: 94, description: 'Excelente em identificar padrões e anomalias' },
      { trait: 'Cauteloso', value: 80, description: 'Avalia riscos antes de agir' },
      { trait: 'Persistente', value: 85, description: 'Não desiste até resolver o problema' },
      { trait: 'Introvertido', value: 70, description: 'Prefere trabalho individual, evita apresentações' },
    ],
    strengths: ['Precisão numérica', 'Modelagem financeira', 'Confiabilidade', 'Atenção a detalhes'],
    improvements: ['Apresentação executiva', 'Visão estratégica', 'Habilidades interpessoais'],
    leadershipPotential: 52, retentionRisk: 45, riskLabel: 'Médio',
    performanceHistory: [
      { month: 'Jan', score: 75 }, { month: 'Fev', score: 78 }, { month: 'Mar', score: 76 },
      { month: 'Abr', score: 80 }, { month: 'Mai', score: 82 }, { month: 'Jun', score: 80 },
      { month: 'Jul', score: 83 }, { month: 'Ago', score: 81 }, { month: 'Set', score: 85 },
      { month: 'Out', score: 84 }, { month: 'Nov', score: 86 }, { month: 'Dez', score: 85 },
    ],
    developmentPlan: [
      { goal: 'Curso de apresentação executiva', deadline: '2026-Q2', status: 'Pendente' },
      { goal: 'Certificação CFA Level 1', deadline: '2027-Q1', status: 'Em andamento' },
      { goal: 'Shadowing com CFO em reuniões', deadline: '2026-Q1', status: 'Concluído' },
    ],
    trainings: [
      { name: 'Comunicação Executiva', status: 'Recomendado', impact: 'Alto' },
      { name: 'Power BI Avançado', status: 'Inscrito', impact: 'Médio' },
      { name: 'Liderança para Analistas', status: 'Recomendado', impact: 'Médio' },
    ],
    careerPath: { current: 'Analista Financeiro Pleno', next: 'Coordenador Financeiro', timeline: '18-24 meses' },
    workStyle: [
      { preference: 'Ambiente', value: 'Presencial' },
      { preference: 'Horário', value: 'Fixo' },
      { preference: 'Comunicação', value: 'Written' },
      { preference: 'Feedback', value: 'Detalhado' },
    ],
  },
  {
    id: 4, name: 'Ana Oliveira', department: 'Marketing', position: 'Coordenadora', admissionDate: '2020-08-20',
    aiSummary: 'Profissional de marketing digital altamente criativa e orientada a resultados. Liderou campanhas que geraram 40% mais leads. Tem perfil de diretora — precisa de exposição a visão comercial e financeira.',
    competencies: [
      { name: 'Marketing Digital', score: 96 },
      { name: 'SEO/SEM', score: 92 },
      { name: 'Gestão de Campanhas', score: 94 },
      { name: 'Analytics', score: 88 },
      { name: 'Liderança', score: 82 },
      { name: 'Criação de Conteúdo', score: 85 },
      { name: 'Gestão Financeira', score: 60 },
      { name: 'Vendas', score: 55 },
    ],
    personality: [
      { trait: 'Criativo', value: 95, description: 'Pensamento fora da caixa, sempre inovando' },
      { trait: 'Orientado a resultados', value: 92, description: 'Focado em métricas e ROI' },
      { trait: 'Ambicioso', value: 88, description: 'Busca constantemente superar metas' },
      { trait: 'Sociável', value: 85, description: 'Excelente em networking e parcerias' },
      { trait: 'Impaciente', value: 72, description: 'Quer resultados rápidos, pode ser impulsiva' },
    ],
    strengths: ['Visão de mercado', 'Geração de leads', 'Gestão de equipes criativas', 'ROI comprovado'],
    improvements: ['Gestão orçamentária', 'Visão de vendas', 'Planejamento de longo prazo'],
    leadershipPotential: 88, retentionRisk: 25, riskLabel: 'Baixo',
    performanceHistory: [
      { month: 'Jan', score: 88 }, { month: 'Fev', score: 90 }, { month: 'Mar', score: 89 },
      { month: 'Abr', score: 92 }, { month: 'Mai', score: 94 }, { month: 'Jun', score: 91 },
      { month: 'Jul', score: 95 }, { month: 'Ago', score: 93 }, { month: 'Set', score: 96 },
      { month: 'Out', score: 94 }, { month: 'Nov', score: 97 }, { month: 'Dez', score: 95 },
    ],
    developmentPlan: [
      { goal: 'Programa de sucessão para Diretora', deadline: '2026-Q4', status: 'Em andamento' },
      { goal: 'MBA Marketing Estratégico', deadline: '2027-Q2', status: 'Pendente' },
      { goal: 'Shadowing com Diretor Comercial', deadline: '2026-Q2', status: 'Em andamento' },
    ],
    trainings: [
      { name: 'Gestão Financeira para Marketing', status: 'Recomendado', impact: 'Alto' },
      { name: 'Estratégia Comercial', status: 'Inscrita', impact: 'Alto' },
      { name: 'Design Thinking Avançado', status: 'Concluído', impact: 'Médio' },
    ],
    careerPath: { current: 'Coordenadora de Marketing', next: 'Diretora de Marketing', timeline: '12-18 meses' },
    workStyle: [
      { preference: 'Ambiente', value: 'Híbrido' },
      { preference: 'Horário', value: 'Flexível' },
      { preference: 'Comunicação', value: 'Síncrona' },
      { preference: 'Feedback', value: 'Visual e rápido' },
    ],
  },
  {
    id: 5, name: 'Carlos Souza', department: 'Marketing', position: 'Designer', admissionDate: '2023-02-14',
    aiSummary: 'Designer talentoso com forte senso estético e domínio de ferramentas UI/UX. Precisa evoluir de executor para estrategista. Potencial para liderar equipe de design com mentoria adequada.',
    competencies: [
      { name: 'UI Design', score: 94 },
      { name: 'UX Research', score: 78 },
      { name: 'Figma', score: 96 },
      { name: 'Photoshop', score: 90 },
      { name: 'Prototipação', score: 85 },
      { name: 'HTML/CSS', score: 72 },
      { name: 'Liderança', score: 45 },
      { name: 'Comunicação', score: 65 },
    ],
    personality: [
      { trait: 'Criativo', value: 97, description: 'Talentoso visualmente, pensamento original' },
      { trait: 'Perfeccionista', value: 90, description: 'Alta qualidade, mas pode ser lento' },
      { trait: 'Observador', value: 88, description: 'Nota detalhes que outros ignoram' },
      { trait: 'Introvertido', value: 75, description: 'Prefere criar, menos interactions sociais' },
      { trait: 'Adaptável', value: 80, description: 'Aberto a feedback e mudanças' },
    ],
    strengths: ['Habilidade visual excepcional', 'Figma avançado', 'Consistencia de marca', 'Speed de entrega'],
    improvements: ['Narrativa de design', 'UX Research', 'Apresentação de projetos', 'Liderança'],
    leadershipPotential: 48, retentionRisk: 40, riskLabel: 'Médio',
    performanceHistory: [
      { month: 'Jan', score: 78 }, { month: 'Fev', score: 80 }, { month: 'Mar', score: 82 },
      { month: 'Abr', score: 81 }, { month: 'Mai', score: 84 }, { month: 'Jun', score: 83 },
      { month: 'Jul', score: 86 }, { month: 'Ago', score: 85 }, { month: 'Set', score: 87 },
      { month: 'Out', score: 86 }, { month: 'Nov', score: 88 }, { month: 'Dez', score: 87 },
    ],
    developmentPlan: [
      { goal: 'Curso de UX Research', deadline: '2026-Q2', status: 'Em andamento' },
      { goal: 'Liderar redesign do app mobile', deadline: '2026-Q3', status: 'Pendente' },
    ],
    trainings: [
      { name: 'UX Research & Strategy', status: 'Recomendado', impact: 'Alto' },
      { name: 'Design Systems', status: 'Concluído', impact: 'Médio' },
      { name: 'Apresentação de Projetos', status: 'Recomendado', impact: 'Médio' },
    ],
    careerPath: { current: 'Designer Pleno', next: 'Senior Designer / Líder de Design', timeline: '18-24 meses' },
    workStyle: [
      { preference: 'Ambiente', value: 'Remoto' },
      { preference: 'Horário', value: 'Flexível' },
      { preference: 'Comunicação', value: 'Visual (Figma)' },
      { preference: 'Feedback', value: 'Direto e específico' },
    ],
  },
  {
    id: 6, name: 'Fernanda Lima', department: 'TI', position: 'Desenvolvedora', admissionDate: '2022-09-05',
    aiSummary: 'Engenheira full-stack com foco em Python e cloud. Excelente em arquitetura de soluções. Forte candidata a Staff Engineer. Demonstrou capacidade de mentoria excepcional com novos contratados.',
    competencies: [
      { name: 'Python', score: 95 },
      { name: 'Django/Flask', score: 90 },
      { name: 'AWS/GCP', score: 88 },
      { name: 'PostgreSQL', score: 85 },
      { name: 'React.js', score: 78 },
      { name: 'Docker/K8s', score: 82 },
      { name: 'Liderança', score: 75 },
      { name: 'Mentoria', score: 90 },
    ],
    personality: [
      { trait: 'Estratégico', value: 88, description: 'Pensa em arquitetura e escalabilidade' },
      { trait: 'Paciente', value: 92, description: 'Excelente mentora, dedica tempo aos outros' },
      { trait: 'Analítico', value: 90, description: 'Resolve problemas com abordagem científica' },
      { trait: 'Colaborativo', value: 85, description: 'Time-first mentality' },
      { trait: 'Estável', value: 90, description: 'Consistente, previsível, confiável' },
    ],
    strengths: ['Mentoria excepcional', 'Arquitetura cloud', 'Código robusto', 'Documentação'],
    improvements: ['Visão de negócio', 'Negociação com stakeholders', 'Inovação disruptiva'],
    leadershipPotential: 82, retentionRisk: 20, riskLabel: 'Baixo',
    performanceHistory: [
      { month: 'Jan', score: 85 }, { month: 'Fev', score: 87 }, { month: 'Mar', score: 86 },
      { month: 'Abr', score: 89 }, { month: 'Mai', score: 91 }, { month: 'Jun', score: 90 },
      { month: 'Jul', score: 92 }, { month: 'Ago', score: 91 }, { month: 'Set', score: 93 },
      { month: 'Out', score: 92 }, { month: 'Nov', score: 94 }, { month: 'Dez', score: 93 },
    ],
    developmentPlan: [
      { goal: 'Certificação AWS Solutions Architect', deadline: '2026-Q2', status: 'Concluído' },
      { goal: 'Programa Staff Engineer', deadline: '2026-Q4', status: 'Em andamento' },
      { goal: 'Tech Talk na conferência PyCon', deadline: '2026-Q3', status: 'Pendente' },
    ],
    trainings: [
      { name: 'Staff Engineer Leadership', status: 'Inscrita', impact: 'Alto' },
      { name: 'System Design Avançado', status: 'Concluído', impact: 'Alto' },
      { name: 'Comunicação para Tech Leaders', status: 'Recomendado', impact: 'Médio' },
    ],
    careerPath: { current: 'Desenvolvedora Senior', next: 'Staff Engineer', timeline: '12-18 meses' },
    workStyle: [
      { preference: 'Ambiente', value: 'Remoto' },
      { preference: 'Horário', value: 'Flexível' },
      { preference: 'Comunicação', value: 'Assíncrona' },
      { preference: 'Feedback', value: 'Written, técnico' },
    ],
  },
  {
    id: 7, name: 'Ricardo Pereira', department: 'Financeiro', position: 'Contador', admissionDate: '2019-11-30',
    aiSummary: 'Contador experiente com profunda fiscalidade e leg. trabalhista. Contributor silencioso mas essencial. Risco de desligamento por falta de reconhecimento. Ação urgente necessária.',
    competencies: [
      { name: 'Contabilidade Geral', score: 96 },
      { name: 'Fiscalidade', score: 94 },
      { name: 'Legislação Trabalhista', score: 92 },
      { name: 'SAP', score: 85 },
      { name: 'Excel', score: 90 },
      { name: 'Comunicação', score: 45 },
      { name: 'Inovação', score: 35 },
      { name: 'Liderança', score: 40 },
    ],
    personality: [
      { trait: 'Confiável', value: 98, description: 'Extremamente confiável, nunca falha' },
      { trait: 'Detalhista', value: 95, description: 'Nenhum erro passa despercebido' },
      { trait: 'Tradicional', value: 80, description: 'Prefere métodos conhecidos' },
      { trait: 'Silencioso', value: 75, description: 'Trabalha sem chamar atenção' },
      { trait: 'Resistente a mudanças', value: 65, description: 'Prefere o status quo' },
    ],
    strengths: ['Conhecimento fiscal profundo', 'Confiabilidade absoluta', 'Experiência histórica', 'Compliance impecável'],
    improvements: ['Inovação e automação', 'Comunicação com equipe', 'Adaptabilidade a novas tecnologias', 'Visibilidade interna'],
    leadershipPotential: 30, retentionRisk: 75, riskLabel: 'Alto',
    performanceHistory: [
      { month: 'Jan', score: 80 }, { month: 'Fev', score: 80 }, { month: 'Mar', score: 79 },
      { month: 'Abr', score: 78 }, { month: 'Mai', score: 77 }, { month: 'Jun', score: 76 },
      { month: 'Jul', score: 75 }, { month: 'Ago', score: 74 }, { month: 'Set', score: 73 },
      { month: 'Out', score: 72 }, { month: 'Nov', score: 71 }, { month: 'Dez', score: 70 },
    ],
    developmentPlan: [
      { goal: 'Workshop de automação contábil', deadline: '2026-Q2', status: 'Pendente' },
      { goal: 'Reunião 1:1 mensal com gestor', deadline: 'Recorrente', status: 'Em andamento' },
    ],
    trainings: [
      { name: 'Automação de Processos Contábeis', status: 'Recomendado', impact: 'Alto' },
      { name: 'Power BI para Contabilidade', status: 'Recomendado', impact: 'Médio' },
      { name: 'Programa de Reconhecimento', status: 'URGENTE', impact: 'Crítico' },
    ],
    careerPath: { current: 'Contador Senior', next: 'Especialista Fiscal', timeline: 'Manter / Reengajar' },
    workStyle: [
      { preference: 'Ambiente', value: 'Presencial' },
      { preference: 'Horário', value: 'Fixo' },
      { preference: 'Comunicação', value: 'Written' },
      { preference: 'Feedback', value: 'Estruturado' },
    ],
  },
  {
    id: 8, name: 'Juliana Mendes', department: 'RH', position: 'Recursos Humanos', admissionDate: '2021-07-12',
    aiSummary: 'Especialista em recrutamento com forte intuição para identificar talentos. Construiu pipeline eficiente reduzindo tempo de contratação em 35%. Candidata natural a Gerente de RH no médio prazo.',
    competencies: [
      { name: 'Recrutamento', score: 96 },
      { name: 'Seleção', score: 94 },
      { name: 'Employer Branding', score: 82 },
      { name: 'Comunicação', score: 88 },
      { name: 'Empatia', score: 92 },
      { name: 'Excel', score: 72 },
      { name: 'People Analytics', score: 65 },
      { name: 'Gestão', score: 58 },
    ],
    personality: [
      { trait: 'Empático', value: 95, description: 'Conexão genuína com candidatos e colaboradores' },
      { trait: 'Observador', value: 90, description: 'Identifica fit cultural rapidamente' },
      { trait: 'Organizado', value: 88, description: 'Processos estruturados e eficientes' },
      { trait: 'Proativo', value: 85, description: 'Antecipa necessidades de contratação' },
      { trait: 'Sociável', value: 92, description: 'Excelente em networking e relaciones' },
    ],
    strengths: ['Identificação de talentos', 'Relacionamento com candidatos', 'Employer branding', 'Agilidade no processo seletivo'],
    improvements: ['People analytics', 'Gestão de equipe', 'Visão financeira', 'Planejamento estratégico'],
    leadershipPotential: 72, retentionRisk: 30, riskLabel: 'Baixo',
    performanceHistory: [
      { month: 'Jan', score: 84 }, { month: 'Fev', score: 86 }, { month: 'Mar', score: 85 },
      { month: 'Abr', score: 88 }, { month: 'Mai', score: 90 }, { month: 'Jun', score: 89 },
      { month: 'Jul', score: 91 }, { month: 'Ago', score: 90 }, { month: 'Set', score: 92 },
      { month: 'Out', score: 91 }, { month: 'Nov', score: 93 }, { month: 'Dez', score: 92 },
    ],
    developmentPlan: [
      { goal: 'Curso de People Analytics', deadline: '2026-Q2', status: 'Em andamento' },
      { goal: 'Liderar projeto de onboarding', deadline: '2026-Q3', status: 'Pendente' },
      { goal: 'Certificação SHRM', deadline: '2027-Q1', status: 'Pendente' },
    ],
    trainings: [
      { name: 'People Analytics & Métricas', status: 'Recomendado', impact: 'Alto' },
      { name: 'Liderança para RH', status: 'Recomendado', impact: 'Médio' },
      { name: 'Gestão de Projetos RH', status: 'Inscrita', impact: 'Médio' },
    ],
    careerPath: { current: 'Analista de RH', next: 'Coordenadora de Recrutamento', timeline: '12-18 meses' },
    workStyle: [
      { preference: 'Ambiente', value: 'Híbrido' },
      { preference: 'Horário', value: 'Flexível' },
      { preference: 'Comunicação', value: 'Síncrona' },
      { preference: 'Feedback', value: 'Emocional e construtivo' },
    ],
  },
];

const riskColor = (risk: number) => risk >= 60 ? 'text-red-600' : risk >= 35 ? 'text-yellow-600' : 'text-green-600';
const riskBg = (risk: number) => risk >= 60 ? 'bg-red-500' : risk >= 35 ? 'bg-yellow-500' : 'bg-green-500';
const riskLabel = (risk: number) => risk >= 60 ? 'Alto' : risk >= 35 ? 'Médio' : 'Baixo';

export default function IntelligencePage() {
  const [selected, setSelected] = useState<EmployeeIntelligence>(employees[0]);
  const [tab, setTab] = useState<'overview' | 'competencies' | 'personality' | 'development'>('overview');

  const avgLeadership = Math.round(employees.reduce((a, e) => a + e.leadershipPotential, 0) / employees.length);
  const highRisk = employees.filter((e) => e.retentionRisk >= 60).length;
  const avgPerformance = Math.round(employees.reduce((a, e) => a + e.performanceHistory[e.performanceHistory.length - 1].score, 0) / employees.length);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Employee Intelligence Profile</h1>
            <p className="text-sm text-gray-500 mt-1">Análise inteligente comportamental e desempenho dos colaboradores</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 uppercase">Colaboradores</p>
              <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 uppercase">Potencial Médio</p>
              <p className="text-3xl font-bold text-blue-600">{avgLeadership}%</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 uppercase">Performance Média</p>
              <p className="text-3xl font-bold text-purple-600">{avgPerformance}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 uppercase">Risco Alto</p>
              <p className={`text-3xl font-bold ${highRisk > 0 ? 'text-red-600' : 'text-green-600'}`}>{highRisk}</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3 space-y-2">
              {employees.map((emp) => (
                <button key={emp.id} onClick={() => setSelected(emp)}
                  className={`w-full text-left p-3 rounded-xl transition-all ${selected.id === emp.id ? 'bg-primary-600 text-white shadow-lg scale-[1.02]' : 'bg-white hover:bg-gray-100 shadow-sm'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${selected.id === emp.id ? 'bg-white text-primary-600' : 'bg-primary-100 text-primary-700'}`}>
                      {emp.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${selected.id === emp.id ? 'text-white' : 'text-gray-900'}`}>{emp.name}</p>
                      <p className={`text-xs truncate ${selected.id === emp.id ? 'text-primary-100' : 'text-gray-500'}`}>{emp.position}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: riskBg(emp.retentionRisk) }}></div>
                  </div>
                </button>
              ))}
            </div>

            <div className="col-span-9 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xl">
                    {selected.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selected.name}</h2>
                    <p className="text-sm text-gray-500">{selected.position} — {selected.department} — desde {selected.admissionDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {(['overview', 'competencies', 'personality', 'development'] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${tab === t ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {t === 'overview' ? 'Visão Geral' : t === 'competencies' ? 'Competências' : t === 'personality' ? 'Personalidade' : 'Desenvolvimento'}
                    </button>
                  ))}
                </div>
              </div>

              {tab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
                    <h3 className="text-sm font-semibold text-blue-800 mb-2">Resumo Gerado por IA</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{selected.aiSummary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl p-4 border-2" style={{ borderColor: selected.leadershipPotential >= 80 ? '#10b981' : selected.leadershipPotential >= 60 ? '#3b82f6' : '#f59e0b' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Potencial de Liderança</span>
                        <span className="text-2xl font-bold" style={{ color: selected.leadershipPotential >= 80 ? '#10b981' : selected.leadershipPotential >= 60 ? '#3b82f6' : '#f59e0b' }}>{selected.leadershipPotential}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="h-3 rounded-full transition-all duration-700" style={{ width: `${selected.leadershipPotential}%`, backgroundColor: selected.leadershipPotential >= 80 ? '#10b981' : selected.leadershipPotential >= 60 ? '#3b82f6' : '#f59e0b' }}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">{selected.leadershipPotential >= 80 ? 'Pronto para promoção' : selected.leadershipPotential >= 60 ? 'Potencial a desarrollar' : 'Precisa de mentoria'}</p>
                    </div>
                    <div className="rounded-xl p-4 border-2" style={{ borderColor: selected.retentionRisk >= 60 ? '#ef4444' : selected.retentionRisk >= 35 ? '#f59e0b' : '#10b981' }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Risco de Retenção</span>
                        <span className={`text-2xl font-bold ${riskColor(selected.retentionRisk)}`}>{selected.retentionRisk}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className={`h-3 rounded-full transition-all duration-700 ${riskBg(selected.retentionRisk)}`} style={{ width: `${selected.retentionRisk}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Risco {riskLabel(selected.retentionRisk).toLowerCase()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-green-700 mb-2">Pontos Fortes</h3>
                      <div className="space-y-1.5">
                        {selected.strengths.map((s, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 px-3 py-1.5 rounded-lg">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>{s}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-amber-700 mb-2">Áreas de Melhoria</h3>
                      <div className="space-y-1.5">
                        {selected.improvements.map((s, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-amber-50 px-3 py-1.5 rounded-lg">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></span>{s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Performance — Últimos 12 Meses</h3>
                    <div className="flex items-end gap-1 h-24">
                      {selected.performanceHistory.map((p, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full rounded-t transition-all" style={{ height: `${(p.score - 60) * 2}%`, backgroundColor: p.score >= 90 ? '#10b981' : p.score >= 80 ? '#3b82f6' : '#f59e0b' }}></div>
                          <span className="text-[9px] text-gray-400">{p.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-blue-700 mb-2">Trajetória de Carreira</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">{selected.careerPath.current}</span>
                        <span className="text-blue-400">→</span>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded">{selected.careerPath.next}</span>
                      </div>
                      <p className="text-xs text-blue-500 mt-2">Previsão: {selected.careerPath.timeline}</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-purple-700 mb-2">Estilo de Trabalho</h3>
                      <div className="grid grid-cols-2 gap-1">
                        {selected.workStyle.map((w, i) => (
                          <div key={i} className="text-xs"><span className="text-gray-500">{w.preference}:</span> <span className="font-medium text-gray-700">{w.value}</span></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'competencies' && (
                <div className="space-y-4">
                  <div className="relative bg-gray-50 rounded-xl p-6 flex justify-center">
                    <svg viewBox="0 0 400 400" className="w-72 h-72">
                      {[20, 40, 60, 80, 100].map((r) => (
                        <polygon key={r} points={selected.competencies.map((_, i) => {
                          const angle = (Math.PI * 2 * i) / selected.competencies.length - Math.PI / 2;
                          return `${200 + (r * 1.5) * Math.cos(angle)},${200 + (r * 1.5) * Math.sin(angle)}`;
                        }).join(' ')} fill="none" stroke="#e5e7eb" strokeWidth="1" />
                      ))}
                      {selected.competencies.map((_, i) => {
                        const angle = (Math.PI * 2 * i) / selected.competencies.length - Math.PI / 2;
                        return <line key={i} x1="200" y1="200" x2={200 + 150 * Math.cos(angle)} y2={200 + 150 * Math.sin(angle)} stroke="#e5e7eb" strokeWidth="1" />;
                      })}
                      <polygon points={selected.competencies.map((c, i) => {
                        const angle = (Math.PI * 2 * i) / selected.competencies.length - Math.PI / 2;
                        const r = (c.score / 100) * 150;
                        return `${200 + r * Math.cos(angle)},${200 + r * Math.sin(angle)}`;
                      }).join(' ')} fill="rgba(79,70,229,0.2)" stroke="#4f46e5" strokeWidth="2" />
                      {selected.competencies.map((c, i) => {
                        const angle = (Math.PI * 2 * i) / selected.competencies.length - Math.PI / 2;
                        const r = (c.score / 100) * 150;
                        return <circle key={i} cx={200 + r * Math.cos(angle)} cy={200 + r * Math.sin(angle)} r="5" fill="#4f46e5" />;
                      })}
                      {selected.competencies.map((c, i) => {
                        const angle = (Math.PI * 2 * i) / selected.competencies.length - Math.PI / 2;
                        const labelR = 170;
                        const x = 200 + labelR * Math.cos(angle);
                        const y = 200 + labelR * Math.sin(angle);
                        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[11px] fill-gray-600 font-medium">{c.name}</text>;
                      })}
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {selected.competencies.map((c) => (
                      <div key={c.name} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">{c.name}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="h-2 rounded-full transition-all" style={{ width: `${c.score}%`, backgroundColor: c.score >= 90 ? '#10b981' : c.score >= 75 ? '#3b82f6' : c.score >= 60 ? '#f59e0b' : '#ef4444' }}></div>
                          </div>
                        </div>
                        <span className={`text-lg font-bold ${c.score >= 90 ? 'text-green-600' : c.score >= 75 ? 'text-blue-600' : c.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{c.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'personality' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 mb-2">Análise comportamental baseada em performance, interações e avaliação 360°</p>
                  {selected.personality.map((p) => (
                    <div key={p.trait} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">{p.trait}</span>
                        <span className={`text-sm font-bold ${p.value >= 85 ? 'text-green-600' : p.value >= 70 ? 'text-blue-600' : 'text-amber-600'}`}>{p.value}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div className="h-2.5 rounded-full transition-all" style={{ width: `${p.value}%`, backgroundColor: p.value >= 85 ? '#10b981' : p.value >= 70 ? '#3b82f6' : '#f59e0b' }}></div>
                      </div>
                      <p className="text-xs text-gray-500">{p.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'development' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Plano de Desenvolvimento</h3>
                    <div className="space-y-2">
                      {selected.developmentPlan.map((d, i) => (
                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${d.status === 'Concluído' ? 'bg-green-500' : d.status === 'Em andamento' ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{d.goal}</p>
                            <p className="text-xs text-gray-400">{d.deadline}</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${d.status === 'Concluído' ? 'bg-green-100 text-green-700' : d.status === 'Em andamento' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{d.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Treinamentos Recomendados</h3>
                    <div className="space-y-2">
                      {selected.trainings.map((t, i) => (
                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                          <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${t.status === 'Concluído' ? 'bg-green-500' : t.status === 'URGENTE' ? 'bg-red-500 animate-pulse' : t.status === 'Em andamento' || t.status === 'Inscrita' ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{t.name}</p>
                            <p className="text-xs text-gray-400">{t.status}</p>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${t.impact === 'Alto' || t.impact === 'Crítico' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{t.impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
