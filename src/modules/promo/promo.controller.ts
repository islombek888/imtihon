import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { ApplyPromoDto } from './dto/apply-promo.dto';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  create(@Body() dto: CreatePromoDto) {
    return this.promoService.create(dto);
  }

  @Get()
  findAll() {
    return this.promoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoService.findOne(id);
  }

  @Post('apply')
  apply(@Body() dto: ApplyPromoDto) {
    return this.promoService.applyPromo(dto);
  }
}