import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWishlistDto {
@ApiProperty({
description: 'Foydalanuvchi IDsi (MongoDB ObjectId)',
example: '69366f2f64b6ddae40777dee',
})
@IsNotEmpty()
@IsMongoId()
userId: string;

@ApiProperty({
description: 'Mahsulotlar IDlari (MongoDB ObjectId array)',
example: ['63f9c0a2e1b0f123456789ab', '63f9c0a2e1b0f123456789ac'],
type: [String],
})
@IsArray()
@IsMongoId({ each: true })
products: string[];
}
