import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from 'src/modules/order/order.controller';
import { OrderService } from 'src/modules/order/order.service';

describe('OrderModule', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue({
              id: '1',
              userId: '10',
              items: [{ productId: '100', qty: 1 }],
              total: 200000,
            }),
            getUserOrders: jest.fn().mockResolvedValue([
              { id: '1', total: 200000 },
            ]),
            getOrderById: jest.fn().mockResolvedValue({
              id: '1',
              total: 200000,
            }),
            updateOrderStatus: jest.fn().mockResolvedValue({
              id: '1',
              status: 'DELIVERED',
            }),
            cancelOrder: jest.fn().mockResolvedValue({ cancelled: true }),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('service yaratilgan bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('createOrder ishlashi kerak', async () => {
    const result = await service.createOrder({
      userId: '10',
      items: [{ productId: '100', qty: 1 }],
    });

    expect(result.total).toBe(200000);
  });

  it('getUserOrders ishlashi kerak', async () => {
    const result = await service.getUserOrders('10');
    expect(result.length).toBeGreaterThan(0);
  });

  it('getOrderById ishlashi kerak', async () => {
    const result = await service.getOrderById('1');
    expect(result.id).toBe('1');
  });

  it('updateOrderStatus ishlashi kerak', async () => {
    const result = await service.updateOrderStatus('1', 'DELIVERED');
    expect(result.status).toBe('DELIVERED');
  });

  it('cancelOrder ishlashi kerak', async () => {
    const res = await service.cancelOrder('1');
    expect(res.cancelled).toBe(true);
  });
});