import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, timeout, catchError, throwError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000), // 5 sekund
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          return throwError(
            () => new RequestTimeoutException('Request timeout (5s)'),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}