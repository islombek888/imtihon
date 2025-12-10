import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
@ApiProperty({
description: 'Rol nomi',
example: 'admin',
})
@IsString()
name: string;

@ApiProperty({
description: 'Rolga tegishli ruxsatlar ro‘yxati',
example: ['create_product', 'delete_product', 'update_product'],
type: [String],
})
@IsArray()
permissions: string[];
}
