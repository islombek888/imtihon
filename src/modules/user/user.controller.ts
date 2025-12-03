import {Controller,Get,Param,Patch,Body,Delete,} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/chane-password.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Patch('password/:id')
  changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
    return this.userService.changePassword(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}