import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@ApiTags('Candidates')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  private getDefaultCompanyId() {
    return 'default-company';
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar candidato' })
  create(@Body() dto: CreateCandidateDto) {
    return this.candidatesService.create({ ...dto, companyId: dto.companyId || this.getDefaultCompanyId() });
  }

  @Get()
  @ApiOperation({ summary: 'Listar candidatos' })
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('jobPositionId') jobPositionId?: string,
    @Query('experienceLevel') experienceLevel?: string,
  ) {
    return this.candidatesService.findAll(this.getDefaultCompanyId(), { search, status, jobPositionId, experienceLevel });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas de candidatos' })
  getStats() {
    return this.candidatesService.getStats(this.getDefaultCompanyId());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter candidato por ID' })
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar candidato' })
  update(@Param('id') id: string, @Body() dto: UpdateCandidateDto) {
    return this.candidatesService.update(id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status do candidato' })
  updateStatus(@Param('id') id: string, @Body() body: { status: string; notes?: string }) {
    return this.candidatesService.updateStatus(id, body.status, body.notes);
  }

  @Patch(':id/rating')
  @ApiOperation({ summary: 'Avaliar candidato' })
  updateRating(@Param('id') id: string, @Body() body: { rating: number }) {
    return this.candidatesService.updateRating(id, body.rating);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover candidato' })
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(id);
  }

  @Post(':id/interviews')
  @ApiOperation({ summary: 'Agendar entrevista' })
  scheduleInterview(@Param('id') id: string, @Body() body: any) {
    return this.candidatesService.scheduleInterview(id, body);
  }

  @Get(':id/interviews')
  @ApiOperation({ summary: 'Listar entrevistas do candidato' })
  getInterviews(@Param('id') id: string) {
    return this.candidatesService.getInterviews(id);
  }

  @Post('apply')
  @ApiOperation({ summary: 'Candidatura pública (portal)' })
  publicApply(@Body() dto: CreateCandidateDto) {
    return this.candidatesService.publicApply({ ...dto, companyId: dto.companyId || this.getDefaultCompanyId() });
  }
}
