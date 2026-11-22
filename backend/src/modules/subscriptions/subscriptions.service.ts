import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export enum Plan {
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export interface PlanLimits {
  maxUsers: number;
  maxEmployees: number;
  features: string[];
}

const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  STARTER: {
    maxUsers: 5,
    maxEmployees: 50,
    features: ['basic_analytics', 'employee_management', 'reports'],
  },
  PROFESSIONAL: {
    maxUsers: 25,
    maxEmployees: 500,
    features: ['basic_analytics', 'employee_management', 'reports', 'ai_assistant', 'knowledge_base', 'advanced_analytics'],
  },
  ENTERPRISE: {
    maxUsers: -1,
    maxEmployees: -1,
    features: ['basic_analytics', 'employee_management', 'reports', 'ai_assistant', 'knowledge_base', 'advanced_analytics', 'ai_agents', 'custom_reports', 'api_access'],
  },
};

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(companyId: string, plan: Plan, amount: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: { subscriptions: true },
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const activeSubscription = (company as any).subscriptions?.find((s: any) => s.status === 'ACTIVE');
    if (activeSubscription) {
      throw new BadRequestException('Empresa já possui assinatura ativa');
    }

    const limits = PLAN_LIMITS[plan];

    const subscription = await this.prisma.subscription.create({
      data: {
        companyId,
        plan,
        amount,
        status: 'ACTIVE',
        startDate: new Date(),
      },
    });

    await this.prisma.company.update({
      where: { id: companyId },
      data: {
        plan,
        maxUsers: limits.maxUsers,
        maxEmployees: limits.maxEmployees,
      },
    });

    return subscription;
  }

  async getCompanySubscription(companyId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { companyId, status: 'ACTIVE' },
      include: { company: true },
    });

    if (!subscription) {
      throw new NotFoundException('Nenhuma assinatura ativa encontrada');
    }

    return {
      ...subscription,
      limits: PLAN_LIMITS[subscription.plan as Plan],
    };
  }

  async cancelSubscription(companyId: string) {
    const subscription = await this.prisma.subscription.findFirst({
      where: { companyId, status: 'ACTIVE' },
    });

    if (!subscription) {
      throw new NotFoundException('Nenhuma assinatura ativa encontrada');
    }

    return this.prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: 'CANCELLED' },
    });
  }

  async upgradePlan(companyId: string, newPlan: Plan) {
    const currentSubscription = await this.prisma.subscription.findFirst({
      where: { companyId, status: 'ACTIVE' },
    });

    if (!currentSubscription) {
      throw new NotFoundException('Nenhuma assinatura ativa encontrada');
    }

    const planOrder: Record<Plan, number> = {
      STARTER: 1,
      PROFESSIONAL: 2,
      ENTERPRISE: 3,
    };

    if (planOrder[newPlan] <= planOrder[currentSubscription.plan as Plan]) {
      throw new BadRequestException('Novo plano deve ser superior ao atual');
    }

    await this.prisma.subscription.update({
      where: { id: currentSubscription.id },
      data: { status: 'CANCELLED' },
    });

    return this.createSubscription(companyId, newPlan, this.getPlanPrice(newPlan));
  }

  async getPlanLimits(plan: Plan) {
    return PLAN_LIMITS[plan];
  }

  async getAllPlans() {
    return Object.entries(PLAN_LIMITS).map(([plan, limits]) => ({
      plan,
      ...limits,
      price: this.getPlanPrice(plan as Plan),
    }));
  }

  private getPlanPrice(plan: Plan): number {
    const prices: Record<Plan, number> = {
      STARTER: 197,
      PROFESSIONAL: 497,
      ENTERPRISE: 997,
    };
    return prices[plan];
  }
}
