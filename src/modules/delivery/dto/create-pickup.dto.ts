import { IsString } from 'class-validator';

export class CreatePickupDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  workingHours: string;
}