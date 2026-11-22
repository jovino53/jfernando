import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompetencyDto } from './dto/create-competency.dto';

@Injectable()
export class CompetenciesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompetencyDto) {
    return this.prisma.competency.create({
      data: {
        name: dto.name,
        description: dto.description,
        category: dto.category,
      },
    });
  }

  async findAll() {
    return this.prisma.competency.findMany();
  }

  async findByCategory(category: string) {
    return this.prisma.competency.findMany({
      where: { category },
    });
  }

  async assignToEmployee(
    employeeId: string,
    competencyId: string,
    level: number,
  ) {
    return this.prisma.employeeCompetency.create({
      data: {
        employeeId,
        competencyId,
        level,
      },
    });
  }

  async getEmployeeCompetencies(employeeId: string) {
    return this.prisma.employeeCompetency.findMany({
      where: { employeeId },
      include: { competency: true },
    });
  }

  async analyzeWithAI(employeeId: string) {
    const competencies = await this.getEmployeeCompetencies(employeeId);
    const analysis = {
      strengths: competencies
        .filter((c: any) => c.level >= 4)
        .map((c: any) => c.competency?.name || ''),
      areasForImprovement: competencies
        .filter((c: any) => c.level <= 2)
        .map((c: any) => c.competency?.name || ''),
      overallScore:
        competencies.reduce((acc: number, c: any) => acc + c.level, 0) / competencies.length || 0,
      recommendations: [
        'Desenvolver competências comportamentais',
        'Participar de programa de mentoria',
        'Realizar curso avançado na área técnica',
      ],
    };
    return analysis;
  }
}
