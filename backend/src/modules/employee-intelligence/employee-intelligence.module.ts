import { Module } from '@nestjs/common';
import { EmployeeIntelligenceController } from './employee-intelligence.controller';
import { EmployeeIntelligenceService } from './employee-intelligence.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeIntelligenceController],
  providers: [EmployeeIntelligenceService],
  exports: [EmployeeIntelligenceService],
})
export class EmployeeIntelligenceModule {}
