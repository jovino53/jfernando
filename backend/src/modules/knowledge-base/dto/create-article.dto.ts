import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum ArticleCategory {
  POLICIES = 'POLICIES',
  PROCEDURES = 'PROCEDURES',
  BENEFITS = 'BENEFITS',
  ONBOARDING = 'ONBOARDING',
  TRAINING = 'TRAINING',
  FAQ = 'FAQ',
}

export class CreateArticleDto {
  @ApiProperty({ example: 'Política de Home Office' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Conteúdo completo do artigo...' })
  @IsString()
  content: string;

  @ApiProperty({ enum: ArticleCategory })
  @IsEnum(ArticleCategory)
  category: ArticleCategory;

  @ApiPropertyOptional({ example: ['home office', 'trabalho remoto'] })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  authorId?: string;
}
