import { IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({
    description: 'Shahar nomi',
    example: 'Toshkent',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Shahar hududlari (array of string)',
    example: ['Yunusobod', 'Chilonzor', 'Mirzo Ulug‘bek'],
    type: [String],
  })
  @IsArray()
  districts: string[];

  @ApiProperty({
    description: 'Yetkazib berish narxi (so‘m)',
    example: 20000,
  })
  @IsNumber()
  deliveryPrice: number;

  @ApiProperty({
    description: 'Yetkazib berish vaqti',
    example: '1-2 kun',
  })
  @IsString()
  deliveryTime: string;
}
