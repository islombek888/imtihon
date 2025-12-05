// src/common/logger/http-logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLoggerService } from './logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLoggerService) {}

  use(req: any, res: any, next: () => void) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const ms = Date.now() - start;
      this.logger.log(
        `${method} ${originalUrl} → ${res.statusCode} (${ms}ms)`,
        'HTTP',
      );
    });

    next();
  }
}