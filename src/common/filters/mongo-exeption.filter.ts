
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { MongoError, MongoServerError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof MongoServerError && exception.code === 11000) {
            return response.status(HttpStatus.CONFLICT).json({
                success: false,
                statusCode: HttpStatus.CONFLICT,
                message: 'Duplicate key error',
                keyValue: exception.keyValue,
            });
        }

        return response.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            statusCode: HttpStatus.BAD_REQUEST,
            message: exception.message,
        });
    }
}