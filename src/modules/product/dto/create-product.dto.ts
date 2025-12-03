import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}