import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAddressDto {
@ApiPropertyOptional({
description: 'Foydalanuvchi to‘liq ismi',
example: 'Islom Annazarov',
})
@IsString()
@IsOptional()
fullName?: string;

@ApiPropertyOptional({
description: 'Foydalanuvchi telefon raqami',
example: '+998901234567',
})
@IsString()
@IsOptional()
phoneNumber?: string;

@ApiPropertyOptional({
description: 'Hudud nomi',
example: 'Toshkent viloyati',
})
@IsString()
@IsOptional()
region?: string;

@ApiPropertyOptional({
description: 'Tuman nomi',
example: 'Yunusobod tumani',
})
@IsString()
@IsOptional()
district?: string;

@ApiPropertyOptional({
description: 'Ko‘cha nomi',
example: 'Amir Temur ko‘chasi',
})
@IsString()
@IsOptional()
street?: string;

@ApiPropertyOptional({
description: 'Uy raqami',
example: '12A',
})
@IsString()
@IsOptional()
home?: string;

@ApiPropertyOptional({
description: 'Qo‘shimcha ma’lumot',
example: 'Bino 2, eshik chap tomonda',
})
@IsString()
@IsOptional()
additionalInfo?: string;

@ApiPropertyOptional({
description: 'Standart manzil sifatida belgilash',
example: true,
})
@IsBoolean()
@IsOptional()
isDefault?: boolean;
}
