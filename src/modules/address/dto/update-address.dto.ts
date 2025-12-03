import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  home?: string;

  @IsString()
  @IsOptional()
  additionalInfo?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}