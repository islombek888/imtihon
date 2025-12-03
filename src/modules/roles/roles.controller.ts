import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get()
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Post('assign')
  assignRole(@Body() dto: AssignRoleDto) {
    return this.rolesService.assignRole(dto);
  }
}