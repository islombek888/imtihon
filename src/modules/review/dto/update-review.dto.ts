import { IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
@ApiPropertyOptional({
description: 'Baholash reytingi (1–5)',
example: 4,
minimum: 1,
maximum: 5,
})
@IsOptional()
@IsNumber()
@Min(1)
@Max(5)
rating?: number;

@ApiPropertyOptional({
description: 'Foydalanuvchi sharhi',
example: 'Mahsulot juda yaxshi, tavsiya qilaman!',
})
@IsOptional()
@IsString()
comment?: string;
}
