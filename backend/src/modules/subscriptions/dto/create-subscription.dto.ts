import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export enum Plan {
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export class CreateSubscriptionDto {
  @IsEnum(Plan)
  plan: Plan;

  @IsNumber()
  @Min(0)
  @IsOptional()
  amount?: number;
}
