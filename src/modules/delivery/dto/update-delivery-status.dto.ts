import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeliveryStatusDto {
@ApiProperty({
description: 'Yetkazib berish holati',
example: 'delivered',
})
@IsString()
status: string;
}
