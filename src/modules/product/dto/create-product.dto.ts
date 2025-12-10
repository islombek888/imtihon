import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
@ApiProperty({
description: 'Mahsulot nomi',
example: 'iPhone 15 Pro',
})
@IsString()
@IsNotEmpty()
name: string;

@ApiPropertyOptional({
description: 'Mahsulot tavsifi (ixtiyoriy)',
example: 'Apple iPhone 15 Pro, 256GB, Silver',
})
@IsOptional()
@IsString()
description?: string;

@ApiProperty({
description: 'Mahsulot narxi',
example: 1499.99,
})
@IsNumber()
@IsNotEmpty()
price: number;

@ApiPropertyOptional({
description: 'Chegirma miqdori (ixtiyoriy)',
example: 100,
})
@IsOptional()
@IsNumber()
discount?: number;

@ApiProperty({
description: 'Ombordagi mahsulot soni',
example: 50,
})
@IsNumber()
@IsNotEmpty()
stock: number;

@ApiPropertyOptional({
description: 'Kategoriya IDsi (ixtiyoriy)',
example: '63f9c0a2e1b0f123456789ab',
})
@IsOptional()
@IsString()
categoryId?: string;

@ApiPropertyOptional({
description: 'Mahsulot rasmlari (ixtiyoriy)',
example: ['image1.jpg', 'image2.jpg'],
type: [String],
})
@IsOptional()
@IsArray()
images?: string[];
}
