import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsEnum(['order', 'promo', 'system', 'delivery'])
  type: string;
}