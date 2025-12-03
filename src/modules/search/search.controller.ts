import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  async search(@Query() query: SearchDto) {
    return this.searchService.search(query);
  }
}