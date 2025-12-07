import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderController } from 'src/modules/order/order.controller';
import { OrderService } from 'src/modules/order/order.service';
import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto';


describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    create: jest.fn(),
    getMyOrders: jest.fn(),
    findOne: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  // ============================
  // CREATE ORDER
  // ============================
  it('should create an order', async () => {
    const userId = 'user1';
    const dto: CreateOrderDto = {
      deliveryInfo: { fullName: 'John', phone: '123', address: 'Addr', region: 'R', district: 'D' },
      payment: { method: 'cash' },
      promoCode: 'PROMO',
    };
    const result = { id: '1', ...dto };

    mockOrderService.create.mockResolvedValue(result);

    expect(await controller.create(userId, dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(userId, dto);
  });

  it('should throw BadRequestException if create fails', async () => {
    const userId = 'user1';
    const dto: CreateOrderDto = {
      deliveryInfo: { fullName: 'John', phone: '123', address: 'Addr', region: 'R', district: 'D' },
      payment: { method: 'cash' },
    };
    mockOrderService.create.mockRejectedValue(new BadRequestException('Savatcha bo‘sh!'));

    await expect(controller.create(userId, dto)).rejects.toThrow(BadRequestException);
  });

  it('should return user orders', async () => {
    const req: any = { user: { id: 'user1' } };
    const orders = [{ id: '1' }];

    mockOrderService.getMyOrders.mockResolvedValue(orders);

    expect(await controller.getMyOrders(req)).toEqual(orders);
    expect(service.getMyOrders).toHaveBeenCalledWith('user1');
  });



  it('should return a specific order', async () => {
    const order = { id: '1' };
    mockOrderService.findOne.mockResolvedValue(order);

    expect(await controller.findOne('1')).toEqual(order);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if order not found', async () => {
    mockOrderService.findOne.mockRejectedValue(new NotFoundException('Order topilmadi'));

    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  
  it('should update order status', async () => {
    const updatedOrder = { id: '1', status: 'paid' };
    mockOrderService.updateStatus.mockResolvedValue(updatedOrder);

    expect(await controller.updateStatus('1', 'paid')).toEqual(updatedOrder);
    expect(service.updateStatus).toHaveBeenCalledWith('1', 'paid');
  });

  it('should throw NotFoundException if updateStatus fails', async () => {
    mockOrderService.updateStatus.mockRejectedValue(new NotFoundException('Order topilmadi'));

    await expect(controller.updateStatus('999', 'paid')).rejects.toThrow(NotFoundException);
  });
});
