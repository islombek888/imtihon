import { Controller, Get, Query } from '@nestjs/common';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ApiTags } from '@nestjs/swagger';
import { FiltersService } from './filter.service';

@ApiTags('Filters')
@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get('products')
  filterProducts(@Query() query: ProductFilterDto) {
    return this.filtersService.filter(query);
  }
}