import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
@ApiProperty({
description: 'Joriy parol',
example: 'oldPassword123',
})
@IsString()
@IsNotEmpty()
oldPassword: string;

@ApiProperty({
description: 'Yangi parol',
example: 'newPassword456',
})
@IsString()
@IsNotEmpty()
newPassword: string;
}
