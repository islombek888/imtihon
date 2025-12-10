import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeliveryInfoDto {
@ApiProperty({
description: 'Yetkazib beruvchi to‘liq ismi',
example: 'Islom Annazarov',
})
@IsString()
fullName: string;

@ApiProperty({
description: 'Telefon raqam',
example: '+998901234567',
})
@IsString()
phone: string;

@ApiProperty({
description: 'Yetkazib berish manzili',
example: 'Amir Temur ko‘chasi, 12A',
})
@IsString()
address: string;

@ApiProperty({
description: 'Hudud nomi',
example: 'Toshkent viloyati',
})
@IsString()
region: string;

@ApiProperty({
description: 'Tuman nomi',
example: 'Yunusobod tumani',
})
@IsString()
district: string;
}

export class PaymentDto {
@ApiProperty({
description: 'To‘lov usuli',
example: 'card', // card yoki cash
})
@IsString()
method: string;

@ApiPropertyOptional({
description: 'Karta raqami (agar to‘lov kartasi orqali bo‘lsa)',
example: '1234 5678 9012 3456',
})
@IsOptional()
@IsString()
cardNumber?: string;

@ApiPropertyOptional({
description: 'Kartaning amal qilish muddati (MM/YY)',
example: '12/26',
})
@IsOptional()
@IsString()
expiry?: string;

@ApiPropertyOptional({
description: 'Kartaning CVV kodi',
example: '123',
})
@IsOptional()
@IsString()
cvv?: string;
}

export class CreateOrderDto {
@ApiProperty({
description: 'Yetkazib berish ma’lumotlari',
type: DeliveryInfoDto,
})
@ValidateNested()
@Type(() => DeliveryInfoDto)
deliveryInfo: DeliveryInfoDto;

@ApiProperty({
description: 'To‘lov ma’lumotlari',
type: PaymentDto,
})
@ValidateNested()
@Type(() => PaymentDto)
payment: PaymentDto;

@ApiPropertyOptional({
description: 'Promo kod (ixtiyoriy)',
example: 'DISCOUNT10',
})
@IsOptional()
@IsString()
promoCode?: string;
}
