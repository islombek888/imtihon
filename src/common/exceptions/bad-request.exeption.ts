import { BadRequestException as NestBadRequest } from '@nestjs/common';

export class BadRequestException extends NestBadRequest {
  constructor(message: string = 'Bad Request', errors: any = null) {
    super({
      success: false,
      statusCode: 400,
      message,
      errors,
    });
  }
}