import { IsString, IsOptional } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  transactionId?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;
}