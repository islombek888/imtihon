import { IsOptional, IsString, IsNumberString, IsBooleanString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductFilterDto {
@ApiPropertyOptional({
description: 'Kategoriya filteri',
example: 'smartphones',
})
@IsOptional()
@IsString()
category?: string;

@ApiPropertyOptional({
description: 'Brend filteri',
example: 'Apple',
})
@IsOptional()
@IsString()
brand?: string;

@ApiPropertyOptional({
description: 'Minimal narx filteri',
example: '500',
})
@IsOptional()
@IsNumberString()
minPrice?: number;

@ApiPropertyOptional({
description: 'Maksimal narx filteri',
example: '2000',
})
@IsOptional()
@IsNumberString()
maxPrice?: number;

@ApiPropertyOptional({
description: 'Omborda mavjud mahsulotlar filteri',
example: 'true',
})
@IsOptional()
@IsBooleanString()
inStock?: boolean;

@ApiPropertyOptional({
description: 'Saralash parametri',
example: 'price_asc',
})
@IsOptional()
@IsString()
sort?: string;
}
