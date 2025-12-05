import { ConflictException as NestConflict } from '@nestjs/common';

export class ConflictException extends NestConflict {
  constructor(message: string = 'Conflict') {
    super({
      success: false,
      statusCode: 409,
      message,
    });
  }
}