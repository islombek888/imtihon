import { IsMongoId, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuantityDto {
  @ApiProperty({
    description: 'Mahsulot IDsi (MongoDB ObjectId)',
    example: '63f9c0a2e1b0f123456789ab',
  })
  @IsMongoId()
  productId: string;

  @ApiProperty({
    description: 'Savatga qo‘shiladigan mahsulot soni (minimal 1)',
    example: 2,
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}
