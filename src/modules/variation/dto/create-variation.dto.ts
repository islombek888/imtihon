import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateVariationDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}