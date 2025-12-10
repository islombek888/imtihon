import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePickupDto {
@ApiProperty({
description: 'Pickup nuqtasi nomi',
example: 'Toshkent Markaziy Ombor',
})
@IsString()
name: string;

@ApiProperty({
description: 'Pickup nuqtasi manzili',
example: 'Amir Temur ko‘chasi, 12A',
})
@IsString()
address: string;

@ApiProperty({
description: 'Shahar nomi',
example: 'Toshkent',
})
@IsString()
city: string;

@ApiProperty({
description: 'Ishlash soatlari',
example: '09:00 - 18:00',
})
@IsString()
workingHours: string;
}
