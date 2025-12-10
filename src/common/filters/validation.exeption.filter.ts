
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getResponse() as any;

    response.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Validation error',
      errors: error.message || error,
    });
  }
}