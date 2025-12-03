import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsArray()
  @IsMongoId({ each: true })
  products: string[];
}