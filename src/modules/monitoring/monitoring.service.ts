import { Injectable } from '@nestjs/common';
import { HealthService } from './health/health.service';
import { MetricsService } from './metrics/metrics.service';

@Injectable()
export class MonitoringService {
    constructor(
        private readonly healthService: HealthService,
        private readonly metricsService: MetricsService,
    ) { }

    getInfo() {
        return {
            status: 'online',
            endpoints: {
                health: '/health',
                metrics: '/metrics',
            },
            health: this.healthService.checkHealth(),
            metrics: this.metricsService.getMetrics(),
        };
    }
}
