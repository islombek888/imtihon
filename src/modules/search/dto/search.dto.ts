import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchDto {
@ApiPropertyOptional({
description: 'Qidiruv so‘rovi',
example: 'iPhone 15 Pro',
})
@IsOptional()
@IsString()
query?: string;

@ApiPropertyOptional({
description: 'Kategoriya filteri',
example: 'smartphones',
})
@IsOptional()
@IsString()
category?: string;

@ApiPropertyOptional({
description: 'Brend filteri',
example: 'Apple',
})
@IsOptional()
@IsString()
brand?: string;
}
