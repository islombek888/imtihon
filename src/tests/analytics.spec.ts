import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from 'src/modules/analytics/analytics.controller';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';


describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let service: AnalyticsService;

  const mockAnalyticsService = {
    getDashboard: jest.fn(),
    getTopProducts: jest.fn(),
    getWeeklyChart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        {
          provide: AnalyticsService,
          useValue: mockAnalyticsService,
        },
      ],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
    service = module.get<AnalyticsService>(AnalyticsService);
  });


  it('should return dashboard data', async () => {
    const mockData = {
      totalUsers: 10,
      totalProducts: 5,
      totalOrders: 20,
      revenue: 5000,
      todayOrders: 2,
    };

    mockAnalyticsService.getDashboard.mockResolvedValue(mockData);

    const result = await controller.getDashboard();
    expect(result).toEqual(mockData);
    expect(service.getDashboard).toHaveBeenCalled();
  });


  it('should return top products with default limit', async () => {
    const mockProducts = [
      { _id: '1', totalSold: 10, product: { name: 'iPhone' } },
    ];

    mockAnalyticsService.getTopProducts.mockResolvedValue(mockProducts);

    const result = await controller.getTopProducts(undefined);
    expect(result).toEqual(mockProducts);
    expect(service.getTopProducts).toHaveBeenCalledWith(10); // default limit
  });

  it('should return top products with custom limit', async () => {
    const mockProducts = [{ _id: '1', totalSold: 5 }];

    mockAnalyticsService.getTopProducts.mockResolvedValue(mockProducts);

    const result = await controller.getTopProducts(5);
    expect(result).toEqual(mockProducts);
    expect(service.getTopProducts).toHaveBeenCalledWith(5);
  });


  it('should return weekly chart data', async () => {
    const mockChart = [
      { _id: 1, total: 200 },
      { _id: 2, total: 400 },
    ];

    mockAnalyticsService.getWeeklyChart.mockResolvedValue(mockChart);

    const result = await controller.getWeeklyChart();
    expect(result).toEqual(mockChart);
    expect(service.getWeeklyChart).toHaveBeenCalled();
  });
});
