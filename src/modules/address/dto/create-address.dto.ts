import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  home: string;

  @IsString()
  @IsOptional()
  additionalInfo?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}