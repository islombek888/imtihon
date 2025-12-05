// src/modules/monitoring/monitoring.module.ts
import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { MetricsController } from './metrics/metrics.controller';
import { MetricsService } from './metrics/metrics.service';
import { MonitoringController } from './monitoring.controller';


@Module({
  controllers: [
    MonitoringController,
    HealthController,
    MetricsController,
  ],
  providers: [
    
    HealthService,
    MetricsService,
  ],
  exports: [MetricsService, HealthService],
})
export class MonitoringModule {}