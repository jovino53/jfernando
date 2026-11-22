import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClimateService } from './climate.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Climate')
@Controller('climate')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClimateController {
  constructor(private readonly climateService: ClimateService) {}

  @Post('surveys')
  @ApiOperation({ summary: 'Criar pesquisa de clima' })
  createSurvey(@Body() dto: CreateSurveyDto) {
    return this.climateService.createSurvey(dto);
  }

  @Get('surveys')
  @ApiOperation({ summary: 'Listar pesquisas de clima' })
  findAllSurveys() {
    return this.climateService.findAllSurveys();
  }

  @Get('surveys/:id')
  @ApiOperation({ summary: 'Obter pesquisa por ID' })
  findOneSurvey(@Param('id') id: string) {
    return this.climateService.findOneSurvey(id);
  }

  @Post('surveys/:id/responses')
  @ApiOperation({ summary: 'Enviar resposta da pesquisa' })
  submitResponse(
    @Param('id') id: string,
    @Body() body: { answers: Record<string, any>; employeeId?: string },
  ) {
    return this.climateService.submitResponse(
      id,
      body.answers,
      body.employeeId,
    );
  }

  @Get('surveys/:id/results')
  @ApiOperation({ summary: 'Obter resultados da pesquisa' })
  getResults(@Param('id') id: string) {
    return this.climateService.getSurveyResults(id);
  }
}
