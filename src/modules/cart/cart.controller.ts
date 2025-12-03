import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('add')
  addToCart(@Req() req, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.id, dto);
  }

  @Patch('update')
  updateQuantity(@Req() req, @Body() dto: UpdateQuantityDto) {
    return this.cartService.updateQuantity(req.user.id, dto);
  }

  @Delete('remove/:productId')
  removeItem(@Req() req, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.id, productId);
  }

  @Get()
  getMyCart(@Req() req) {
    return this.cartService.getMyCart(req.user.id);
  }

  @Delete('clear')
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.id);
  }
}