import { IsOptional, IsString, IsInt, IsIn, Min, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductFilterDto {
@ApiPropertyOptional({
description: 'Qidiruv so‘rovi',
example: 'iPhone',
})
@IsOptional()
@IsString()
query?: string;

@ApiPropertyOptional({
description: 'Kategoriya IDsi',
example: '63f9c0a2e1b0f123456789ab',
})
@IsOptional()
@IsString()
categoryId?: string;

@ApiPropertyOptional({
description: 'Brend nomi',
example: 'Apple',
})
@IsOptional()
@IsString()
brand?: string;

@ApiPropertyOptional({
description: 'Rang filtri',
example: 'red',
})
@IsOptional()
@IsString()
color?: string;

@ApiPropertyOptional({
description: 'Xotira hajmi',
example: '256GB',
})
@IsOptional()
@IsString()
storage?: string;

@ApiPropertyOptional({
description: 'Minimal narx',
example: 500,
})
@IsOptional()
@Transform(({ value }) => Number(value))
@IsInt()
@Min(0)
priceMin?: number;

@ApiPropertyOptional({
description: 'Maksimal narx',
example: 2000,
})
@IsOptional()
@Transform(({ value }) => Number(value))
@IsInt()
@Min(0)
priceMax?: number;

@ApiPropertyOptional({
description: 'Minimal reyting',
example: 4,
})
@IsOptional()
@Transform(({ value }) => Number(value))
@IsInt()
@Min(0)
ratingMin?: number;

@ApiPropertyOptional({
description: 'Omborda mavjud mahsulotlar',
example: true,
})
@IsOptional()
@IsBoolean()
@Transform(({ value }) => value === 'true' || value === true)
inStock?: boolean;

@ApiPropertyOptional({
description: 'Saralash parametri',
example: 'price_asc',
enum: ['price_asc','price_desc','newest','bestseller','rating_desc'],
})
@IsOptional()
@IsIn(['price_asc','price_desc','newest','bestseller','rating_desc'])
sort?: string;

@ApiPropertyOptional({
description: 'Sahifa raqami',
example: 1,
})
@IsOptional()
@Transform(({ value }) => parseInt(value, 10))
@IsInt()
page?: number = 1;

@ApiPropertyOptional({
description: 'Sahifadagi maksimal elementlar soni',
example: 20,
})
@IsOptional()
@Transform(({ value }) => parseInt(value, 10))
@IsInt()
limit?: number = 20;
}
