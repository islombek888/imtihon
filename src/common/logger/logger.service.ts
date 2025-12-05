
import { Injectable, LoggerService, Inject } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Injectable()
export class AppLoggerService implements LoggerService {
constructor(
@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: WinstonLogger,
) {}

log(message: any, context?: string) {
this.logger.info(message, { context });
}

error(message: any, trace?: string, context?: string) {
this.logger.error(message, { trace, context });
}

warn(message: any, context?: string) {
this.logger.warn(message, { context });
}
}
