import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  categoryId: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  colors?: string[];

  @IsArray()
  @IsOptional()
  specs?: any[];
}