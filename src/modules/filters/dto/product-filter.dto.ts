import { IsOptional, IsString, IsNumberString, IsBooleanString } from 'class-validator';

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumberString()
  minPrice?: number;

  @IsOptional()
  @IsNumberString()
  maxPrice?: number;

  @IsOptional()
  @IsBooleanString()
  inStock?: boolean;

  @IsOptional()
  @IsString()
  sort?: string; 
}