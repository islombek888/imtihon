import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
@ApiProperty({
description: 'Buyurtma IDsi',
example: '69366f2f64b6ddae40777dee',
})
@IsString()
@IsNotEmpty()
orderId: string;

@ApiProperty({
description: 'Foydalanuvchi IDsi',
example: '69366f2f64b6ddae40777def',
})
@IsString()
@IsNotEmpty()
userId: string;

@ApiProperty({
description: 'To‘lov miqdori',
example: 1499.99,
})
@IsNumber()
@IsNotEmpty()
amount: number;

@ApiPropertyOptional({
description: 'To‘lov usuli (ixtiyoriy)',
example: 'card',
})
@IsOptional()
@IsString()
paymentMethod?: string;
}
