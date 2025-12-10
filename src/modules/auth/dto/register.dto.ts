
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Foydalanuvchining to‘liq ismi',
    example: 'Islombek Abdullayev',
  })
  fullName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Foydalanuvchi email manzili',
    example: 'islom@example.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @ApiProperty({
    description: 'Parol (kamida 8 ta belgi)',
    example: 'StrongP@ssw0rd',
  })
  password: string;

  @IsOptional()
  @IsString()
  adminSecret?: string;

}
