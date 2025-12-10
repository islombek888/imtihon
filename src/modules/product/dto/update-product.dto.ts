import { IsString, IsNumber, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
@ApiPropertyOptional({
description: 'Mahsulot nomi',
example: 'iPhone 15 Pro',
})
@IsOptional()
@IsString()
name?: string;

@ApiPropertyOptional({
description: 'Mahsulot tavsifi',
example: 'Apple iPhone 15 Pro, 256GB, Silver',
})
@IsOptional()
@IsString()
description?: string;

@ApiPropertyOptional({
description: 'Mahsulot narxi',
example: 1499.99,
})
@IsOptional()
@IsNumber()
price?: number;

@ApiPropertyOptional({
description: 'Chegirma miqdori',
example: 100,
})
@IsOptional()
@IsNumber()
discount?: number;

@ApiPropertyOptional({
description: 'Ombordagi mahsulot soni',
example: 50,
})
@IsOptional()
@IsNumber()
stock?: number;

@ApiPropertyOptional({
description: 'Kategoriya IDsi',
example: '63f9c0a2e1b0f123456789ab',
})
@IsOptional()
@IsString()
categoryId?: string;

@ApiPropertyOptional({
description: 'Mahsulot rasmlari',
example: ['image1.jpg', 'image2.jpg'],
type: [String],
})
@IsOptional()
@IsArray()
images?: string[];

@ApiPropertyOptional({
description: 'Mahsulot faol/yoki faol emasligi',
example: true,
})
@IsOptional()
@IsBoolean()
isActive?: boolean;
}
