import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePromoDto {
@ApiProperty({
description: 'Promo kod',
example: 'DISCOUNT10',
})
@IsString()
@IsNotEmpty()
code: string;

@ApiProperty({
description: 'Promo turi',
example: 'percent',
enum: ['percent', 'amount'],
})
@IsEnum(['percent', 'amount'])
type: 'percent' | 'amount';

@ApiProperty({
description: 'Promo qiymati (foiz yoki summa)',
example: 10,
})
@IsNumber()
value: number;

@ApiPropertyOptional({
description: 'Minimal summa (ixtiyoriy)',
example: 500,
})
@IsOptional()
@IsNumber()
minPrice?: number;

@ApiProperty({
description: 'Promo amal qilish muddati',
example: '2025-12-31T23:59:59Z',
})
@IsDateString()
expiresAt: string;
}
