import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ApplyPromoDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  cartTotal: number; 
}