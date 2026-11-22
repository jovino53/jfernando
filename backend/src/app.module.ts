import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { CompetenciesModule } from './modules/competencies/competencies.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ClimateModule } from './modules/climate/climate.module';
import { TalentModule } from './modules/talent/talent.module';
import { KnowledgeBaseModule } from './modules/knowledge-base/knowledge-base.module';
import { EmployeeIntelligenceModule } from './modules/employee-intelligence/employee-intelligence.module';
import { AiAgentsModule } from './modules/ai-agents/ai-agents.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { ContentPlannerModule } from './modules/content-planner/content-planner.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    EmployeesModule,
    CompetenciesModule,
    AnalyticsModule,
    AiAssistantModule,
    ReportsModule,
    ClimateModule,
    TalentModule,
    KnowledgeBaseModule,
    EmployeeIntelligenceModule,
    AiAgentsModule,
    SubscriptionsModule,
    CandidatesModule,
    ContentPlannerModule,
  ],
})
export class AppModule {}
