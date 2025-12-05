import { UnauthorizedException as NestUnauthorized } from '@nestjs/common';

export class UnauthorizedException extends NestUnauthorized {
  constructor(message: string = 'Unauthorized') {
    super({
      success: false,
      statusCode: 401,
      message,
    });
  }
}