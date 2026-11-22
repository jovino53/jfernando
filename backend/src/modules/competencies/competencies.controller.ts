import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CompetenciesService } from './competencies.service';
import { CreateCompetencyDto } from './dto/create-competency.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Competencies')
@Controller('competencies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CompetenciesController {
  constructor(private readonly competenciesService: CompetenciesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova competência' })
  create(@Body() dto: CreateCompetencyDto) {
    return this.competenciesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as competências' })
  findAll() {
    return this.competenciesService.findAll();
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Listar competências por categoria' })
  findByCategory(@Param('category') category: string) {
    return this.competenciesService.findByCategory(category);
  }

  @Post('assign/:employeeId/:competencyId')
  @ApiOperation({ summary: 'Atribuir competência ao colaborador' })
  assign(
    @Param('employeeId') employeeId: string,
    @Param('competencyId') competencyId: string,
    @Body('level') level: number,
  ) {
    return this.competenciesService.assignToEmployee(
      employeeId,
      competencyId,
      level,
    );
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Obter competências do colaborador' })
  getEmployeeCompetencies(@Param('employeeId') employeeId: string) {
    return this.competenciesService.getEmployeeCompetencies(employeeId);
  }

  @Get('analyze/:employeeId')
  @ApiOperation({ summary: 'Analisar competências com IA' })
  analyze(@Param('employeeId') employeeId: string) {
    return this.competenciesService.analyzeWithAI(employeeId);
  }
}
