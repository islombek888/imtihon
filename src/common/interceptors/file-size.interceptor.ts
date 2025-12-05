import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  PayloadTooLargeException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FileSizeInterceptor implements NestInterceptor {
  constructor(private maxSize: number = 2 * 1024 * 1024) {} 

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req.file && req.file.size > this.maxSize) {
      throw new PayloadTooLargeException(
        `File size exceeds limit of ${this.maxSize / 1024 / 1024}MB`,
      );
    }

    return next.handle();
  }
}