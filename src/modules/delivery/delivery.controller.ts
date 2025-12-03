import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CreatePickupDto } from './dto/create-pickup.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

 
  @Post('city')
  createCity(@Body() dto: CreateCityDto) {
    return this.deliveryService.createCity(dto);
  }

  @Get('city')
  getCities() {
    return this.deliveryService.getCities();
  }

  @Post('pickup')
  createPickup(@Body() dto: CreatePickupDto) {
    return this.deliveryService.createPickup(dto);
  }

  @Get('pickup')
  getPickups() {
    return this.deliveryService.getPickups();
  }

  @Patch(':orderId/status')
  updateDeliveryStatus(
    @Param('orderId') orderId: string,
    @Body() dto: UpdateDeliveryStatusDto,
  ) {
    return this.deliveryService.updateDeliveryStatus(orderId, dto);
  }

  @Get(':orderId')
  getDelivery(@Param('orderId') orderId: string) {
    return this.deliveryService.getDelivery(orderId);
  }
}