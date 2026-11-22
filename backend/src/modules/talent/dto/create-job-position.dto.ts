import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobPositionDto {
  @ApiProperty({ example: 'Desenvolvedor Full Stack Pleno' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Buscamos desenvolvedor com experiência em React e Node.js' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Tecnologia' })
  @IsString()
  department: string;

  @ApiPropertyOptional({ example: 'São Paulo - SP' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ example: 6000 })
  @IsNumber()
  @IsOptional()
  salaryRangeMin?: number;

  @ApiPropertyOptional({ example: 10000 })
  @IsNumber()
  @IsOptional()
  salaryRangeMax?: number;

  @ApiPropertyOptional({ example: ['React', 'Node.js', 'TypeScript'] })
  @IsArray()
  @IsOptional()
  requirements?: string[];
}
