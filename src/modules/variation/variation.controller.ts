import { Controller, Post, Get, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { VariationService } from './variation.service';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';

@Controller('variations')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @Post()
  create(@Body() dto: CreateVariationDto) {
    return this.variationService.create(dto);
  }

  @Get()
  findAll(@Query('productId') productId: string) {
    return this.variationService.findAll(productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVariationDto) {
    return this.variationService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.variationService.delete(id);
  }
}