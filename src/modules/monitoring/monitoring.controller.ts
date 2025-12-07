
import { Controller, Get } from '@nestjs/common';

@Controller('monitoring')
export class MonitoringController {
  @Get()
  info() {
    return {
      status: 'online',
      endpoints: {
        health: '/health',
        metrics: '/metrics',
      },
    };
  }
}