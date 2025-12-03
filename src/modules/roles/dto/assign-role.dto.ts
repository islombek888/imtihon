import { IsString } from 'class-validator';

export class AssignRoleDto {
  @IsString()
  userId: string;

  @IsString()
  role: string; 
}