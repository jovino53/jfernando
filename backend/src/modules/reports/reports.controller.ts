import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo relatório' })
  create(@Body() dto: CreateReportDto) {
    return this.reportsService.create(dto.type, dto.title, dto.parameters);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os relatórios' })
  findAll() {
    return this.reportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter relatório por ID' })
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Post(':id/generate')
  @ApiOperation({ summary: 'Gerar dados do relatório' })
  generate(@Param('id') id: string) {
    return this.reportsService.generateReport(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover relatório' })
  remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
}
