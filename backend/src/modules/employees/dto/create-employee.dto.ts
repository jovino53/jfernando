import { IsString, IsEmail, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
}

export class CreateEmployeeDto {
  @ApiProperty({ example: 'João' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'joao.silva@empresa.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '+55 11 99999-9999' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Desenvolvedor Full Stack' })
  @IsString()
  position: string;

  @ApiProperty({ example: 'Tecnologia' })
  @IsString()
  department: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  managerId?: string;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsDateString()
  @IsOptional()
  hireDate?: Date;

  @ApiPropertyOptional({ example: 8500.00 })
  @IsOptional()
  salary?: number;

  @ApiPropertyOptional({ enum: EmployeeStatus })
  @IsEnum(EmployeeStatus)
  @IsOptional()
  status?: EmployeeStatus;
}
