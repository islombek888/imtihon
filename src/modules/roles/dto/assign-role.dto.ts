import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
@ApiProperty({
description: 'Foydalanuvchi IDsi',
example: '69366f2f64b6ddae40777dee',
})
@IsString()
userId: string;

@ApiProperty({
description: 'Foydalanuvchiga beriladigan rol nomi',
example: 'admin',
})
@IsString()
role: string;
}
