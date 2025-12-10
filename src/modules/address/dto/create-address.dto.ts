import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
@ApiProperty({
description: 'Foydalanuvchi ID',
example: '69366f2f64b6ddae40777dee',
})
@IsString()
@IsNotEmpty()
userId: string;

@ApiProperty({
description: 'Foydalanuvchi to‘liq ismi',
example: 'Islom Annazarov',
})
@IsString()
@IsNotEmpty()
fullName: string;

@ApiProperty({
description: 'Foydalanuvchi telefon raqami',
example: '+998901234567',
})
@IsString()
@IsNotEmpty()
phoneNumber: string;

@ApiProperty({
description: 'Hudud nomi',
example: 'Toshkent viloyati',
})
@IsString()
@IsNotEmpty()
region: string;

@ApiProperty({
description: 'Tuman nomi',
example: 'Yunusobod tumani',
})
@IsString()
@IsNotEmpty()
district: string;

@ApiProperty({
description: 'Ko‘cha nomi',
example: 'Amir Temur ko‘chasi',
})
@IsString()
@IsNotEmpty()
street: string;

@ApiProperty({
description: 'Uy raqami',
example: '12A',
})
@IsString()
@IsNotEmpty()
home: string;

@ApiProperty({
description: 'Qo‘shimcha ma’lumot (ixtiyoriy)',
example: 'Bino 2, eshik chap tomonda',
required: false,
})
@IsString()
@IsOptional()
additionalInfo?: string;

@ApiProperty({
description: 'Standart manzil sifatida belgilash (ixtiyoriy)',
example: true,
required: false,
})
@IsBoolean()
@IsOptional()
isDefault?: boolean;
}
