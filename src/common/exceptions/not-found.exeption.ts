import { NotFoundException as NestNotFound } from '@nestjs/common';

export class NotFoundException extends NestNotFound {
  constructor(message: string = 'Resource not found') {
    super({
      success: false,
      statusCode: 404,
      message,
    });
  }
}