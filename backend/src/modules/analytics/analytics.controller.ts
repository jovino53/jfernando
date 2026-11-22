import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Obter dados do dashboard' })
  getDashboard() {
    return this.analyticsService.getDashboard();
  }

  @Get('departments')
  @ApiOperation({ summary: 'Análise por departamento' })
  getDepartmentAnalytics() {
    return this.analyticsService.getDepartmentAnalytics();
  }

  @Get('turnover')
  @ApiOperation({ summary: 'Análise de turnover' })
  getTurnoverAnalytics() {
    return this.analyticsService.getTurnoverAnalytics();
  }

  @Get('compensation')
  @ApiOperation({ summary: 'Análise de compensação' })
  getCompensationAnalytics() {
    return this.analyticsService.getCompensationAnalytics();
  }
}
