import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePaymentDto {
@ApiPropertyOptional({
description: 'To‘lov holati',
example: 'completed',
})
@IsOptional()
@IsString()
status?: string;

@ApiPropertyOptional({
description: 'Tranzaksiya IDsi',
example: 'txn_01F8X2X3',
})
@IsOptional()
@IsString()
transactionId?: string;

@ApiPropertyOptional({
description: 'To‘lov usuli',
example: 'card',
})
@IsOptional()
@IsString()
paymentMethod?: string;
}
