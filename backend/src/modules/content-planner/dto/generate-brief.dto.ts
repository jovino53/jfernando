import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class GenerateBriefDto {
  @ApiProperty({ example: 'inteligência artificial para marketing' })
  @IsString()
  @MinLength(3)
  topic: string;

  @ApiProperty({ example: 'BR', required: false })
  @IsOptional()
  @IsString()
  market?: string;

  @ApiProperty({ example: '7d', required: false })
  @IsOptional()
  @IsString()
  period?: string;

  @ApiProperty({ example: 'gestores de marketing', required: false })
  @IsOptional()
  @IsString()
  audience?: string;

  @ApiProperty({ example: 'trafego', required: false })
  @IsOptional()
  @IsString()
  objective?: string;

  @ApiProperty({ example: 'estrategico', required: false })
  @IsOptional()
  @IsString()
  tone?: string;
}
