import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiAgentsService } from './ai-agents.service';

@Controller('api/agents')
@UseGuards(JwtAuthGuard)
export class AiAgentsController {
  constructor(private readonly agentsService: AiAgentsService) {}

  @Get()
  async getAllAgents() {
    return this.agentsService.getAllAgents();
  }

  @Get(':type')
  async getAgentInfo(@Param('type') type: string) {
    return this.agentsService.getAgentInfo(type);
  }

  @Post('recruiter/analyze/:candidateId')
  async analyzeCandidate(@Param('candidateId') candidateId: string) {
    return this.agentsService.analyzeCandidate('RECRUITER', candidateId);
  }

  @Post('talent/analyze')
  async analyzeTalent(@Request() req: any) {
    return this.agentsService.analyzeTalent(req.user.companyId);
  }

  @Post('learning/plan/:employeeId')
  async createLearningPlan(@Param('employeeId') employeeId: string) {
    return this.agentsService.createLearningPlan(employeeId);
  }

  @Post('leadership/support')
  async supportManager(@Request() req: any, @Body('question') question: string) {
    return this.agentsService.supportManager(req.user.employeeId, question);
  }
}
