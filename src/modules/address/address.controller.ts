import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  createAddress(@Body() dto: CreateAddressDto) {
    return this.addressService.create(dto);
  }

  @Get(':userId')
  getUserAddresses(@Param('userId') userId: string) {
    return this.addressService.findUserAddresses(userId);
  }

  @Patch('default/:userId/:id')
  setDefault(
    @Param('userId') userId: string,
    @Param('id') id: string,
  ) {
    return this.addressService.setDefault(userId, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAddressDto) {
    return this.addressService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.addressService.delete(id);
  }
}