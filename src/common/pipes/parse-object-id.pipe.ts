import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ObjectId format');
    }
    return value;
  }
}