import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenerateProfileDto } from './dto/generate-profile.dto';

@Injectable()
export class EmployeeIntelligenceService {
  constructor(private prisma: PrismaService) {}

  async generateProfile(dto: GenerateProfileDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: dto.employeeId },
      include: {
        department: true,
        position: true,
        employeeSkills: { include: { skill: true } },
        performanceReviews: true,
        trainings: true,
        manager: true,
        directReports: true,
      },
    });

    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    const professionalSummary = this.generateSummary(employee);
    const competencyMap = this.generateCompetencyMap(employee);
    const strengths = this.identifyStrengths(employee);
    const improvementAreas = this.identifyImprovementAreas(employee);
    const leadershipPotential = this.calculateLeadershipPotential(employee);
    const developmentPlan = this.generateDevelopmentPlan(employee);
    const riskScore = this.calculateRetentionRisk(employee);

    const profile = await this.prisma.employeeIntelligenceProfile.upsert({
      where: { employeeId: dto.employeeId },
      create: {
        employeeId: dto.employeeId,
        professionalSummary,
        competencyMap,
        strengths,
        improvementAreas,
        leadershipPotential,
        developmentPlan,
        riskScore,
        retentionRisk: this.getRetentionRiskLevel(riskScore),
      },
      update: {
        professionalSummary,
        competencyMap,
        strengths,
        improvementAreas,
        leadershipPotential,
        developmentPlan,
        riskScore,
        retentionRisk: this.getRetentionRiskLevel(riskScore),
      },
    });

    return profile;
  }

  async getProfileByEmployeeId(employeeId: string) {
    const profile = await this.prisma.employeeIntelligenceProfile.findUnique({
      where: { employeeId },
      include: { employee: true },
    });

    if (!profile) {
      throw new NotFoundException('Perfil inteligente não encontrado');
    }

    return profile;
  }

  async getAllProfiles(companyId: string) {
    return this.prisma.employeeIntelligenceProfile.findMany({
      where: { employee: { companyId } },
      include: { employee: true },
    });
  }

  private generateSummary(employee: any): string {
    const yearsExp = this.calculateYearsExperience(employee.hireDate);
    const skillsCount = employee.employeeSkills?.length || 0;
    const avgScore = this.calculateAverageScore(employee.performanceReviews);
    const directReportsCount = employee.directReports?.length || 0;

    return `${employee.name} é ${employee.position?.name} no departamento de ${employee.department?.name}, ` +
      `com ${yearsExp} anos de experiência na empresa. ` +
      `Possui ${skillsCount} competências mapeadas e média de performance de ${avgScore.toFixed(1)}. ` +
      `${directReportsCount > 0 ? `Lidera ${directReportsCount} colaboradores diretamente.` : 'Não possui liderança direta.'}`;
  }

  private generateCompetencyMap(employee: any) {
    const skills = employee.employeeSkills || [];

    return {
      technical: skills.slice(0, 5).map((es: any) => ({
        skill: es.skill?.name || 'Skill',
        level: es.level === 'EXPERT' ? 5 : es.level === 'ADVANCED' ? 4 : es.level === 'INTERMEDIATE' ? 3 : 2,
        trend: 'stable' as const,
      })),
      behavioral: [
        { skill: 'Comunicação', level: 4, trend: 'improving' as const },
        { skill: 'Trabalho em Equipe', level: 4, trend: 'stable' as const },
        { skill: 'Resolução de Problemas', level: 3, trend: 'improving' as const },
      ],
      leadership: employee.directReports?.length > 0 ? [
        { skill: 'Liderança', level: 4, trend: 'improving' as const },
        { skill: 'Tomada de Decisão', level: 3, trend: 'stable' as const },
      ] : [],
    };
  }

  private identifyStrengths(employee: any): string[] {
    const strengths: string[] = [];
    const avgScore = this.calculateAverageScore(employee.performanceReviews);

    if (avgScore >= 4) strengths.push('Alta performance consistentemente');
    if (employee.directReports?.length > 0) strengths.push('Experiência em liderança');
    if (employee.trainings?.length >= 3) strengths.push('Comprometimento com desenvolvimento');
    if (employee.employeeSkills?.length >= 5) strengths.push('Perfil técnico diversificado');

    if (strengths.length === 0) {
      strengths.push('Comprometimento com a organização');
    }

    return strengths;
  }

  private identifyImprovementAreas(employee: any): string[] {
    const areas: string[] = [];
    const avgScore = this.calculateAverageScore(employee.performanceReviews);

    if (avgScore < 3.5) areas.push('Performance precisa de atenção');
    if (employee.trainings?.length < 2) areas.push('Mais participação em treinamentos');
    if (employee.employeeSkills?.length < 3) areas.push('Expandir competências técnicas');

    return areas;
  }

  private calculateLeadershipPotential(employee: any): number {
    let score = 50;
    const avgScore = this.calculateAverageScore(employee.performanceReviews);

    if (avgScore >= 4.5) score += 25;
    else if (avgScore >= 4) score += 15;
    else if (avgScore >= 3.5) score += 5;

    if (employee.directReports?.length > 0) score += 15;
    if (employee.trainings?.length >= 3) score += 10;
    if (employee.employeeSkills?.length >= 5) score += 10;

    return Math.min(100, Math.max(0, score));
  }

  private generateDevelopmentPlan(employee: any) {
    return {
      shortTermGoals: [
        {
          title: 'Aprimorar competências técnicas',
          description: 'Completar trilhas de aprendizado pendentes',
          deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          priority: 'high' as const,
        },
      ],
      longTermGoals: [
        {
          title: 'Desenvolver habilidades de liderança',
          description: 'Participar de programa de mentoria',
          deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          priority: 'medium' as const,
        },
      ],
      recommendedTrainings: [
        'Liderança Eficaz',
        'Comunicação Corporativa',
        'Gestão de Projetos',
      ],
      mentorshipSuggestions: ['Conectar com líderes seniores do departamento'],
    };
  }

  private calculateRetentionRisk(employee: any): number {
    let risk = 30;
    const avgScore = this.calculateAverageScore(employee.performanceReviews);
    const yearsInCompany = this.calculateYearsExperience(employee.hireDate);

    if (yearsInCompany > 3 && avgScore < 3.5) risk += 30;
    if (yearsInCompany > 5) risk += 15;
    if (employee.directReports?.length === 0 && avgScore >= 4) risk += 20;

    return Math.min(100, Math.max(0, risk));
  }

  private calculateYearsExperience(hireDate: Date): number {
    const now = new Date();
    const hired = new Date(hireDate);
    return Math.floor((now.getTime() - hired.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  }

  private calculateAverageScore(reviews: any[]): number {
    if (!reviews || reviews.length === 0) return 3.0;
    const validReviews = reviews.filter(r => r.score != null);
    if (validReviews.length === 0) return 3.0;
    return validReviews.reduce((acc: number, r: any) => acc + r.score, 0) / validReviews.length;
  }

  private getRetentionRiskLevel(score: number): string {
    if (score >= 70) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  }
}
