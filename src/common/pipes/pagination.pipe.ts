import { PipeTransform, BadRequestException } from '@nestjs/common';

export class PaginationPipe implements PipeTransform {
  transform(value: any) {

    const page = Number(value.page) || 1;
    const limit = Number(value.limit) || 20;

    if (page < 1) {
      throw new BadRequestException('Page must be above 1');
    }

    if (limit < 1 || limit > 100) {
      throw new BadRequestException('Limit must be between 1 and 100');
    }

    return {
      page,
      limit,
      skip: (page - 1) * limit,
    };
  }
}