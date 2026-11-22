import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ReportType {
  HEADCOUNT = 'HEADCOUNT',
  TURNOVER = 'TURNOVER',
  COMPENSATION = 'COMPENSATION',
  PERFORMANCE = 'PERFORMANCE',
  ABSENTEEISM = 'ABSENTEEISM',
  DIVERSITY = 'DIVERSITY',
  CUSTOM = 'CUSTOM',
}

export class CreateReportDto {
  @ApiProperty({ example: 'Relatório de Headcount Q1 2024' })
  @IsString()
  title: string;

  @ApiProperty({ enum: ReportType })
  @IsEnum(ReportType)
  type: ReportType;

  @ApiPropertyOptional()
  @IsOptional()
  parameters?: any;
}
