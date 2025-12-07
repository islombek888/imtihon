
import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkAll() {
    return {
      server: this.healthService.checkServer(),
      database: this.healthService.checkDatabase(),
      memory: this.healthService.checkMemory(),
    };
  }
}