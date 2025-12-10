import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
@ApiPropertyOptional({
description: 'Foydalanuvchi to‘liq ismi',
example: 'Islom Annazarov',
})
@IsOptional()
@IsString()
name?: string;

@ApiPropertyOptional({
description: 'Foydalanuvchi email manzili',
example: '[islom@example.com](mailto:islom@example.com)',
})
@IsOptional()
@IsEmail()
email?: string;

@ApiPropertyOptional({
description: 'Foydalanuvchi avatari URL',
example: '[https://example.com/avatar.jpg](https://example.com/avatar.jpg)',
})
@IsOptional()
@IsString()
avatar?: string;
}
