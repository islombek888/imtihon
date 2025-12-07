import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from 'src/modules/monitoring/health/health.controller';
import { HealthService } from 'src/modules/monitoring/health/health.service';
import { MetricsController } from 'src/modules/monitoring/metrics/metrics.controller';
import { MetricsService } from 'src/modules/monitoring/metrics/metrics.service';
import { MonitoringController } from 'src/modules/monitoring/monitoring.controller';
import { MonitoringService } from 'src/modules/monitoring/monitoring.service';


describe('Monitoring Module Tests', () => {
  let monitoringController: MonitoringController;
  let monitoringService: MonitoringService;
  let metricsController: MetricsController;
  let metricsService: MetricsService;
  let healthController: HealthController;
  let healthService: HealthService;

  const mockHealthService = {
    checkHealth: jest.fn(),
    checkServer: jest.fn(),
    checkDatabase: jest.fn(),
    checkMemory: jest.fn(),
  };

  const mockMetricsService = {
    getMetrics: jest.fn(),
    countRequest: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        MonitoringController,
        MetricsController,
        HealthController,
      ],
      providers: [
        MonitoringService,
        { provide: HealthService, useValue: mockHealthService },
        { provide: MetricsService, useValue: mockMetricsService },
      ],
    }).compile();

    monitoringController = module.get<MonitoringController>(MonitoringController);
    monitoringService = module.get<MonitoringService>(MonitoringService);
    metricsController = module.get<MetricsController>(MetricsController);
    metricsService = module.get<MetricsService>(MetricsService);
    healthController = module.get<HealthController>(HealthController);
    healthService = module.get<HealthService>(HealthService);
  });


  it('MonitoringController should be defined', () => {
    expect(monitoringController).toBeDefined();
  });

  it('MonitoringController info() should return status and endpoints', () => {
    const result = monitoringController.info();
    expect(result).toEqual({
      status: 'online',
      endpoints: {
        health: '/health',
        metrics: '/metrics',
      },
    });
  });


  it('MonitoringService should be defined', () => {
    expect(monitoringService).toBeDefined();
  });

  it('MonitoringService.getInfo() should call health and metrics services', () => {
    mockHealthService.checkHealth.mockReturnValue('health-ok');
    mockMetricsService.getMetrics.mockReturnValue('metrics-ok');

    const result = monitoringService.getInfo();
    expect(result).toEqual({
      status: 'online',
      endpoints: {
        health: '/health',
        metrics: '/metrics',
      },
      health: 'health-ok',
      metrics: 'metrics-ok',
    });
    expect(mockHealthService.checkHealth).toHaveBeenCalled();
    expect(mockMetricsService.getMetrics).toHaveBeenCalled();
  });


  it('MetricsController should be defined', () => {
    expect(metricsController).toBeDefined();
  });

  it('MetricsController getMetrics() should return metrics and set header', async () => {
    const mockRes: any = { setHeader: jest.fn(), send: jest.fn() };
    mockMetricsService.getMetrics.mockResolvedValue('mock-metrics');

    await metricsController.getMetrics(mockRes);

    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockRes.send).toHaveBeenCalledWith('mock-metrics');
    expect(mockMetricsService.getMetrics).toHaveBeenCalled();
  });


  it('HealthController should be defined', () => {
    expect(healthController).toBeDefined();
  });

  it('HealthController checkAll() should return health statuses', () => {
    mockHealthService.checkServer.mockReturnValue({ status: 'ok', message: 'Server is running', timestamp: 't' });
    mockHealthService.checkDatabase.mockReturnValue({ status: 'ok', message: 'Database connected' });
    mockHealthService.checkMemory.mockReturnValue({ status: 'ok', used: 123 });

    const result = healthController.checkAll();
    expect(result).toEqual({
      server: { status: 'ok', message: 'Server is running', timestamp: 't' },
      database: { status: 'ok', message: 'Database connected' },
      memory: { status: 'ok', used: 123 },
    });
  });
});
