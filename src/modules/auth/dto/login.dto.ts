
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
   @ApiProperty({
    description: 'Foydalanuvchi email manzili',
    example: 'islom@example.com',
  })
  email: string;

  @MinLength(8)
   @ApiProperty({
    description: 'Parol (kamida 8 ta belgi)',
    example: 'StrongP@ssw0rd',
  })
  password: string;
}