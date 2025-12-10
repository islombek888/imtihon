import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
@ApiProperty({
description: 'Kategoriya nomi',
example: 'Smartphones',
})
@IsString()
@IsNotEmpty()
name: string;

@ApiProperty({
description: 'Kategoriya URL slugi',
example: 'smartphones',
})
@IsString()
@IsNotEmpty()
slug: string;

@ApiPropertyOptional({
description: 'Kategoriya ikonkasi (ixtiyoriy)',
example: 'icon-phone.svg',
})
@IsOptional()
@IsString()
icon?: string;

@ApiPropertyOptional({
description: 'Kategoriya rasmi (ixtiyoriy)',
example: 'smartphones.jpg',
})
@IsOptional()
@IsString()
image?: string;
}
