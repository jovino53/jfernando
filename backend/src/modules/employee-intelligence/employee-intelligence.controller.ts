import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmployeeIntelligenceService } from './employee-intelligence.service';
import { GenerateProfileDto } from './dto/generate-profile.dto';

@Controller('api/intelligence')
@UseGuards(JwtAuthGuard)
export class EmployeeIntelligenceController {
  constructor(private readonly intelligenceService: EmployeeIntelligenceService) {}

  @Post('generate')
  async generateProfile(@Body() dto: GenerateProfileDto) {
    return this.intelligenceService.generateProfile(dto);
  }

  @Get('profile/:employeeId')
  async getProfile(@Param('employeeId') employeeId: string) {
    return this.intelligenceService.getProfileByEmployeeId(employeeId);
  }

  @Get('profiles')
  async getAllProfiles(@Request() req: any) {
    return this.intelligenceService.getAllProfiles(req.user.companyId);
  }
}
