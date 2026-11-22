import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TalentService } from './talent.service';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Talent')
@Controller('talent')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @Post('positions')
  @ApiOperation({ summary: 'Criar vaga' })
  createPosition(@Body() dto: CreateJobPositionDto) {
    return this.talentService.createPosition(dto);
  }

  @Get('positions')
  @ApiOperation({ summary: 'Listar vagas' })
  findAllPositions() {
    return this.talentService.findAllPositions();
  }

  @Get('positions/:id')
  @ApiOperation({ summary: 'Obter vaga por ID' })
  findOnePosition(@Param('id') id: string) {
    return this.talentService.findOnePosition(id);
  }

  @Post('candidates')
  @ApiOperation({ summary: 'Cadastrar candidato' })
  createCandidate(@Body() dto: CreateCandidateDto) {
    return this.talentService.createCandidate(dto);
  }

  @Get('candidates')
  @ApiOperation({ summary: 'Listar candidatos' })
  findAllCandidates() {
    return this.talentService.findAllCandidates();
  }

  @Patch('candidates/:id/status')
  @ApiOperation({ summary: 'Atualizar status do candidato' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.talentService.updateCandidateStatus(id, status as any);
  }

  @Get('pipeline')
  @ApiOperation({ summary: 'Obter pipeline de talentos' })
  getPipeline() {
    return this.talentService.getTalentPipeline();
  }
}
