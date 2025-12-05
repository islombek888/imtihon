import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto.';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserId } from 'src/common/decorators/user-id.decorator';




@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Post()
  create(@UserId() userId: string, @Body() dto: CreateOrderDto) {
    return this.orderService.create(userId, dto);
  }

  @Get('my')
  getMyOrders(@Req() req) {
    const userId = req.user.id;
    return this.orderService.getMyOrders(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id/:status')
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: string,
  ) {
    return this.orderService.updateStatus(id, status);
  }
}



