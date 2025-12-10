import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVariationDto {
@ApiProperty({
description: 'Mahsulot IDsi',
example: '63f9c0a2e1b0f123456789ab',
})
@IsString()
@IsNotEmpty()
productId: string;

@ApiProperty({
description: 'Variatsiya sarlavhasi',
example: 'iPhone 15 Pro 256GB Silver',
})
@IsString()
@IsNotEmpty()
title: string;

@ApiProperty({
description: 'Variatsiya narxi',
example: 1499.99,
})
@IsNumber()
price: number;

@ApiProperty({
description: 'Ombordagi stock miqdori',
example: 50,
})
@IsNumber()
stock: number;

@ApiPropertyOptional({
description: 'SKU kodi (ixtiyoriy)',
example: 'IPH15PRO256S',
})
@IsOptional()
@IsString()
sku?: string;

@ApiPropertyOptional({
description: 'Variatsiya rasmlari (ixtiyoriy)',
example: ['image1.jpg', 'image2.jpg'],
type: [String],
})
@IsOptional()
@IsArray()
images?: string[];
}
