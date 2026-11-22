import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatDto {
  @ApiProperty({ example: 'Quais são os benefícios da empresa?' })
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsOptional()
  context?: any[];
}
