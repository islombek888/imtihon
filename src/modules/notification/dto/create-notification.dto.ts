import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
@ApiProperty({
description: 'Foydalanuvchi IDsi (MongoDB ObjectId)',
example: '69366f2f64b6ddae40777dee',
})
@IsString()
@IsNotEmpty()
userId: string;

@ApiProperty({
description: 'Bildirishnoma sarlavhasi',
example: 'Buyurtma tasdiqlandi',
})
@IsString()
title: string;

@ApiProperty({
description: 'Bildirishnoma xabari',
example: 'Sizning buyurtmangiz 12:00 da jo‘natildi',
})
@IsString()
message: string;

@ApiProperty({
description: 'Bildirishnoma turi',
example: 'order',
enum: ['order', 'promo', 'system', 'delivery'],
})
@IsEnum(['order', 'promo', 'system', 'delivery'])
type: string;
}
