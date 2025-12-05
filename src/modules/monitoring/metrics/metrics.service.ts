// src/modules/monitoring/metrics/metrics.service.ts
import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly register = new client.Registry();
  private readonly httpRequestCount = new client.Counter({
    name: 'http_request_total',
    help: 'Total number of HTTP requests',
  });

  constructor() {
    client.collectDefaultMetrics({ register: this.register });

    this.register.registerMetric(this.httpRequestCount);
  }

  countRequest() {
    this.httpRequestCount.inc();
  }

  async getMetrics() {
    return this.register.metrics();
  }
}