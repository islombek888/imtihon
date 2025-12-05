import { ForbiddenException as NestForbidden } from '@nestjs/common';

export class ForbiddenException extends NestForbidden {
  constructor(message: string = 'Access denied') {
    super({
      success: false,
      statusCode: 403,
      message,
    });
  }
}