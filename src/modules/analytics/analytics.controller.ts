import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  getDashboard() {
    return this.analyticsService.getDashboard();
  }

  @Get('top-products')
  getTopProducts(@Query('limit') limit: number = 10) {
    return this.analyticsService.getTopProducts(limit);
  }

  @Get('weekly-chart')
  getWeeklyChart() {
    return this.analyticsService.getWeeklyChart();
  }
}