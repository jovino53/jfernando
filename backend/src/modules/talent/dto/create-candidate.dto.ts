import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCandidateDto {
  @ApiProperty({ example: 'Maria Santos' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'maria@email.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+55 11 98888-8888' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  resumeUrl?: string;

  @ApiProperty()
  @IsString()
  positionId: string;

  @ApiPropertyOptional({ example: ['React', 'TypeScript', 'Node.js'] })
  @IsArray()
  @IsOptional()
  skills?: string[];
}
