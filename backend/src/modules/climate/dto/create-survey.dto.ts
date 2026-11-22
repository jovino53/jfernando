import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSurveyDto {
  @ApiProperty({ example: 'Pesquisa de Clima Q1 2024' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Pesquisa trimestral de clima organizacional' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: [{ question: 'Como você avalia o ambiente de trabalho?', type: 'scale' }] })
  @IsArray()
  questions: any[];

  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2024-01-31' })
  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
