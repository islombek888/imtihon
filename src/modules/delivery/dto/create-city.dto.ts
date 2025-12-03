import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsArray()
  districts: string[];

  @IsNumber()
  deliveryPrice: number;

  @IsString()
  deliveryTime: string;
}