import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyPromoDto {
@ApiProperty({
description: 'Promo kod',
example: 'DISCOUNT10',
})
@IsString()
@IsNotEmpty()
code: string;

@ApiProperty({
description: 'Savatdagi jami summa',
example: 1500,
})
@IsNumber()
@IsNotEmpty()
cartTotal: number;
}
