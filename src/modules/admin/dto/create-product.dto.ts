import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
@ApiProperty({
description: 'Mahsulot nomi',
example: 'iPhone 15 Pro',
})
@IsString()
name: string;

@ApiProperty({
description: 'Mahsulot tavsifi',
example: 'Apple iPhone 15 Pro, 256GB, Silver',
})
@IsString()
description: string;

@ApiProperty({
description: 'Mahsulot narxi',
example: 1499.99,
})
@IsNumber()
price: number;

@ApiProperty({
description: 'Mahsulot kategoriyasi IDsi',
example: '63f9c0a2e1b0f123456789ab',
})
@IsString()
categoryId: string;

@ApiPropertyOptional({
description: 'Mahsulot rasmlari (array)',
example: ['image1.jpg', 'image2.jpg'],
type: [String],
})
@IsArray()
@IsOptional()
images?: string[];

@ApiPropertyOptional({
description: 'Mahsulot ranglari (array)',
example: ['red', 'blue', 'black'],
type: [String],
})
@IsArray()
@IsOptional()
colors?: string[];

@ApiPropertyOptional({
description: 'Mahsulot texnik xususiyatlari (array of objects)',
example: [{ key: 'Screen', value: '6.1 inch' }, { key: 'Battery', value: '3095 mAh' }],
type: [Object],
})
@IsArray()
@IsOptional()
specs?: any[];
}
