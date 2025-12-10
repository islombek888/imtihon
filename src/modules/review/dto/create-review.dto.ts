import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
@ApiProperty({
description: 'Foydalanuvchi IDsi',
example: '69366f2f64b6ddae40777dee',
})
@IsString()
@IsNotEmpty()
userId: string;

@ApiProperty({
description: 'Mahsulot IDsi',
example: '63f9c0a2e1b0f123456789ab',
})
@IsString()
@IsNotEmpty()
productId: string;

@ApiProperty({
description: 'Baholash reytingi (1–5)',
example: 5,
minimum: 1,
maximum: 5,
})
@IsNumber()
@Min(1)
@Max(5)
rating: number;

@ApiProperty({
description: 'Foydalanuvchi sharhi',
example: 'Mahsulot juda yaxshi, tavsiya qilaman!',
})
@IsString()
@IsNotEmpty()
comment: string;
}
