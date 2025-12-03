import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreatePromoDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(['percent', 'amount'])
  type: 'percent' | 'amount';

  @IsNumber()
  value: number;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsDateString()
  expiresAt: string;
}