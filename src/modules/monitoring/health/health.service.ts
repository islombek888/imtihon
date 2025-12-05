// src/modules/monitoring/health/health.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth() {
      throw new Error('Method not implemented.');
  }
  checkServer() {
    return {
      status: 'ok',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
    };
  }

  checkDatabase() {
    return {
      status: 'ok',
      message: 'Database connected',
    };
  }

  checkMemory() {
    return {
      status: 'ok',
      used: process.memoryUsage().rss,
    };
  }
}