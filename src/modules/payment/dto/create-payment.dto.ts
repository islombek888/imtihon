import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  @IsString()
  paymentMethod?: string;
}