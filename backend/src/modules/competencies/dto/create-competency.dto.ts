import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CompetencyCategory {
  TECHNICAL = 'TECHNICAL',
  BEHAVIORAL = 'BEHAVIORAL',
  LEADERSHIP = 'LEADERSHIP',
  DIGITAL = 'DIGITAL',
  LANGUAGE = 'LANGUAGE',
}

export class CreateCompetencyDto {
  @ApiProperty({ example: 'React.js' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Framework frontend para desenvolvimento web' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: CompetencyCategory })
  @IsEnum(CompetencyCategory)
  @IsOptional()
  category?: CompetencyCategory;
}
