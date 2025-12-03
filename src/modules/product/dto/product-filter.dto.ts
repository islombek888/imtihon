import { IsOptional, IsString, IsNumberString, IsIn, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductFilterDto {
  @IsOptional()
  @IsString()
  query?: string; 

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  storage?: string; 

  @IsOptional()
  @IsNumberString()
  priceMin?: string;

  @IsOptional()
  @IsNumberString()
  priceMax?: string;

  @IsOptional()
  @IsNumberString()
  ratingMin?: string;

  @IsOptional()
  @IsIn(['price_asc','price_desc','newest','bestseller','rating_desc'])
  sortBy?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  limit?: number = 20;
}