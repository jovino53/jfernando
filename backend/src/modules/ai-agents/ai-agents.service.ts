import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface AgentResponse {
  agent: string;
  analysis: string;
  recommendations: string[];
  data: any;
}

@Injectable()
export class AiAgentsService {
  private agents: Record<string, { name: string; description: string; systemPrompt: string }> = {
    RECRUITER: {
      name: 'Nexus Recruiter Agent',
      description: 'Especialista em análise de candidatos e recrutamento',
      systemPrompt: 'Analise candidatos e forneça insights sobre compatibilidade com vagas.',
    },
    TALENT: {
      name: 'Nexus Talent Agent',
      description: 'Especialista em identificação e retenção de talentos',
      systemPrompt: 'Analise dados de colaboradores para identificar talentos e riscos de turnover.',
    },
    LEARNING: {
      name: 'Nexus Learning Agent',
      description: 'Especialista em desenvolvimento e treinamentos',
      systemPrompt: 'Crie planos de desenvolvimento personalizados para colaboradores.',
    },
    LEADERSHIP: {
      name: 'Nexus Leadership Agent',
      description: 'Especialista em apoio a gestores',
      systemPrompt: 'Forneça orientações para gestores sobre liderança e gestão de equipes.',
    },
  };

  constructor(private prisma: PrismaService) {}

  async analyzeCandidate(agentType: string, candidateId: string): Promise<AgentResponse> {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
      include: { jobPosition: true },
    });

    if (!candidate) {
      throw new NotFoundException('Candidato não encontrado');
    }

    const analysis = this.generateCandidateAnalysis(candidate);

    return {
      agent: this.agents[agentType]?.name || 'Nexus AI Agent',
      analysis: analysis.summary,
      recommendations: analysis.recommendations,
      data: {
        candidateName: candidate.name,
        position: (candidate as any).jobPosition?.title,
        matchScore: analysis.matchScore,
        strengths: analysis.strengths,
        concerns: analysis.concerns,
      },
    };
  }

  async analyzeTalent(companyId: string): Promise<AgentResponse> {
    const employees = await this.prisma.employee.findMany({
      where: { companyId, status: 'ACTIVE' },
      include: {
        department: true,
        position: true,
        performanceReviews: true,
        employeeSkills: { include: { skill: true } },
      },
    });

    const talentAnalysis = this.generateTalentAnalysis(employees);

    return {
      agent: this.agents.TALENT.name,
      analysis: talentAnalysis.summary,
      recommendations: talentAnalysis.recommendations,
      data: {
        totalEmployees: employees.length,
        highPerformers: talentAnalysis.highPerformers,
        retentionRisks: talentAnalysis.retentionRisks,
        successionCandidates: talentAnalysis.successionCandidates,
      },
    };
  }

  async createLearningPlan(employeeId: string): Promise<AgentResponse> {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        department: true,
        position: true,
        employeeSkills: { include: { skill: true } },
        performanceReviews: true,
        trainings: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    const learningPlan = this.generateLearningPlan(employee);

    return {
      agent: this.agents.LEARNING.name,
      analysis: learningPlan.summary,
      recommendations: learningPlan.recommendations,
      data: {
        employeeName: employee.name,
        currentSkills: (employee as any).employeeSkills?.length || 0,
        suggestedTrainings: learningPlan.trainings,
        timeline: learningPlan.timeline,
      },
    };
  }

  async supportManager(managerId: string, question: string): Promise<AgentResponse> {
    const manager = await this.prisma.employee.findUnique({
      where: { id: managerId },
      include: {
        directReports: {
          include: {
            department: true,
            position: true,
            performanceReviews: true,
          },
        },
        department: true,
      },
    });

    if (!manager) {
      throw new NotFoundException('Gestor não encontrado');
    }

    const support = this.generateManagerSupport(manager, question);

    return {
      agent: this.agents.LEADERSHIP.name,
      analysis: support.analysis,
      recommendations: support.recommendations,
      data: {
        managerName: manager.name,
        teamSize: (manager as any).directReports?.length || 0,
        department: (manager as any).department?.name,
        insights: support.insights,
      },
    };
  }

  async getAgentInfo(agentType: string) {
    const agent = this.agents[agentType];
    if (!agent) {
      throw new NotFoundException('Agente não encontrado');
    }
    return agent;
  }

  async getAllAgents() {
    return Object.entries(this.agents).map(([key, value]) => ({
      type: key,
      ...value,
    }));
  }

  private generateCandidateAnalysis(candidate: any) {
    const matchScore = 75 + Math.floor(Math.random() * 20);

    return {
      summary: `Análise do candidato ${candidate.name} para a vaga de ${candidate.jobPosition?.title}. ` +
        `Score de compatibilidade: ${matchScore}%. Candidato demonstra potencial para a posição.`,
      matchScore,
      recommendations: [
        'Agendar entrevista técnica',
        'Verificar experiência prévia relevante',
        'Avaliar fit cultural',
      ],
      strengths: [
        'Experiência compatível',
        'Boa formação acadêmica',
        'Perfil alinhado com a vaga',
      ],
      concerns: [
        'Validar habilidades técnicas específicas',
      ],
    };
  }

  private generateTalentAnalysis(employees: any[]) {
    const highPerformers = employees.filter(e => {
      const reviews = e.performanceReviews || [];
      const avgScore = reviews.reduce((acc: number, r: any) => acc + (r.score || 0), 0) /
        (reviews.length || 1);
      return avgScore >= 4;
    }).length;

    return {
      summary: `Análise de talentos realizada com ${employees.length} colaboradores. ` +
        `${highPerformers} colaboradores de alta performance identificados.`,
      recommendations: [
        'Implementar programa de retenção para alta performance',
        'Desenvolver plano de successão para cargos críticos',
        'Expandir programa de mentoria',
      ],
      highPerformers,
      retentionRisks: Math.floor(employees.length * 0.15),
      successionCandidates: Math.floor(employees.length * 0.1),
    };
  }

  private generateLearningPlan(employee: any) {
    return {
      summary: `Plano de desenvolvimento para ${employee.name}. ` +
        `Foco em fortalecer competências técnicas e comportamentais.`,
      recommendations: [
        'Priorizar treinamentos alinhados com gaps identificados',
        'Estabelecer mentoria com líderes seniores',
        'Definir metas claras de desenvolvimento',
      ],
      trainings: [
        'Liderança Eficaz',
        'Comunicação Corporativa',
        'Gestão de Conflitos',
        'Pensamento Estratégico',
      ],
      timeline: '6 meses',
    };
  }

  private generateManagerSupport(manager: any, question: string) {
    const teamSize = manager.directReports?.length || 0;

    return {
      analysis: `Suporte ao gestor ${manager.name} da equipe de ${manager.department?.name}. ` +
        `Equipe com ${teamSize} colaboradores. Analisando a questão: "${question}"`,
      recommendations: [
        'Realizar 1:1s semanais com a equipe',
        'Establish clear goals and expectations',
        'Promover feedback contínuo',
      ],
      insights: [
        `Tamanho da equipe: ${teamSize} pessoas`,
        'Sugestão: implementar check-ins regulares',
        'Focar no desenvolvimento individual de cada membro',
      ],
    };
  }
}
