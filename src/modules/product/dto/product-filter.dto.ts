import { IsOptional, IsString, IsInt, IsIn, Min, IsBoolean } from 'class-validator';
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
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  priceMin?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  priceMax?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  ratingMin?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  inStock?: boolean;

  @IsOptional()
  @IsIn(['price_asc','price_desc','newest','bestseller','rating_desc'])
  sort?: string;   

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  limit?: number = 20;
}
