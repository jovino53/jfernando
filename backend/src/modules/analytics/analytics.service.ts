import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    const totalEmployees = await this.prisma.employee.count();
    const activeEmployees = await this.prisma.employee.count({
      where: { status: 'ACTIVE' },
    });

    const departments = await this.prisma.employee.groupBy({
      by: ['departmentId'],
      _count: { id: true },
    });

    const recentHires = await this.prisma.employee.findMany({
      orderBy: { hireDate: 'desc' },
      take: 5,
    });

    return {
      summary: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees: totalEmployees - activeEmployees,
        turnoverRate: 8.5,
        averageTenure: 2.4,
        employeeSatisfaction: 4.2,
      },
      departments,
      recentHires,
      monthlyTrends: [
        { month: 'Jan', hires: 5, terminations: 2 },
        { month: 'Fev', hires: 3, terminations: 1 },
        { month: 'Mar', hires: 7, terminations: 3 },
        { month: 'Abr', hires: 4, terminations: 2 },
        { month: 'Mai', hires: 6, terminations: 1 },
        { month: 'Jun', hires: 8, terminations: 4 },
      ],
    };
  }

  async getDepartmentAnalytics() {
    return this.prisma.employee.groupBy({
      by: ['departmentId'],
      _count: { id: true },
      _avg: { salary: true },
    });
  }

  async getTurnoverAnalytics() {
    return {
      overall: 8.5,
      byDepartment: [
        { department: 'Tecnologia', rate: 6.2 },
        { department: 'Vendas', rate: 12.1 },
        { department: 'Marketing', rate: 7.8 },
        { department: 'RH', rate: 5.4 },
      ],
      byTenure: [
        { tenure: '< 1 ano', rate: 15.2 },
        { tenure: '1-2 anos', rate: 9.8 },
        { tenure: '2-5 anos', rate: 5.3 },
        { tenure: '5+ anos', rate: 2.1 },
      ],
    };
  }

  async getCompensationAnalytics() {
    return {
      averageSalary: 7500,
      medianSalary: 6800,
      salaryDistribution: [
        { range: 'Até 3k', count: 45 },
        { range: '3k-5k', count: 78 },
        { range: '5k-8k', count: 120 },
        { range: '8k-12k', count: 65 },
        { range: '12k+', count: 32 },
      ],
      payGap: {
        gender: 8.2,
        ethnicity: 5.1,
      },
    };
  }
}
