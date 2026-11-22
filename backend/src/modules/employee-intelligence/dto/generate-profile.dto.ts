import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class GenerateProfileDto {
  @IsString()
  employeeId: string;

  @IsBoolean()
  @IsOptional()
  includeHistorical?: boolean;
}
