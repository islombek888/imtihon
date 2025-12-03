import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  brand?: string;
}