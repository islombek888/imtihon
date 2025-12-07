import {
  IsOptional,
  IsString,
  ValidateNested,
 
} from 'class-validator';
import { Type } from 'class-transformer';

export class DeliveryInfoDto {
  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  region: string;

  @IsString()
  district: string;
}

export class PaymentDto {
  @IsString()
  method: string; 

  @IsOptional()
  @IsString()
  cardNumber?: string;

  @IsOptional()
  @IsString()
  expiry?: string;

  @IsOptional()
  @IsString()
  cvv?: string;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => DeliveryInfoDto)
  deliveryInfo: DeliveryInfoDto;

  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;

  @IsOptional()
  @IsString()
  promoCode?: string;
}