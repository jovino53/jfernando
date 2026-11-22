import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(type: string, title: string, parameters?: any) {
    return this.prisma.report.create({
      data: {
        title,
        type,
        parameters: parameters || {},
        status: 'PENDING',
      },
    });
  }

  async findAll() {
    return this.prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.report.findUnique({ where: { id } });
  }

  async generateReport(id: string) {
    await this.prisma.report.update({
      where: { id },
      data: { status: 'PROCESSING' },
    });

    const report = await this.prisma.report.findUnique({ where: { id } });
    const result = await this.generateReportData(report.type, report.parameters);

    return this.prisma.report.update({
      where: { id },
      data: {
        result,
        status: 'COMPLETED',
      },
    });
  }

  private async generateReportData(type: string, parameters: any) {
    const mockData: Record<string, any> = {
      HEADCOUNT: {
        total: 340,
        byDepartment: [
          { department: 'Tecnologia', count: 120 },
          { department: 'Vendas', count: 85 },
          { department: 'Marketing', count: 45 },
          { department: 'RH', count: 30 },
          { department: 'Financeiro', count: 60 },
        ],
      },
      TURNOVER: {
        overall: 8.5,
        monthly: [
          { month: 'Jan', rate: 7.2 },
          { month: 'Fev', rate: 8.1 },
          { month: 'Mar', rate: 9.3 },
        ],
      },
      COMPENSATION: {
        average: 7500,
        median: 6800,
        distribution: [
          { range: 'Até 3k', count: 45 },
          { range: '3k-5k', count: 78 },
          { range: '5k-8k', count: 120 },
          { range: '8k-12k', count: 65 },
          { range: '12k+', count: 32 },
        ],
      },
    };

    return mockData[type] || { message: 'Relatório gerado com sucesso' };
  }

  async remove(id: string) {
    return this.prisma.report.delete({ where: { id } });
  }
}
