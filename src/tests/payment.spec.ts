import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PaymentController } from 'src/modules/payment/payment.controller';
import { PaymentService } from 'src/modules/payment/payment.service';
import { CreatePaymentDto } from 'src/modules/payment/dto/create-payment.dto';
import { UpdatePaymentDto } from 'src/modules/payment/dto/update-payment.dto';


describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPaymentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        { provide: PaymentService, useValue: mockPaymentService },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });


  it('should create a payment', async () => {
    const dto: CreatePaymentDto = {
      orderId: 'order1',
      userId: 'user1',
      amount: 1000,
      paymentMethod: 'card',
    };
    const result = { ...dto, id: '1', status: 'pending' };

    mockPaymentService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

 
  it('should return all payments', async () => {
    const payments = [{ id: '1', amount: 1000 }];
    mockPaymentService.findAll.mockResolvedValue(payments);

    expect(await controller.findAll()).toEqual(payments);
    expect(service.findAll).toHaveBeenCalled();
  });


  it('should return a single payment', async () => {
    const payment = { id: '1', amount: 1000 };
    mockPaymentService.findOne.mockResolvedValue(payment);

    expect(await controller.findOne('1')).toEqual(payment);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if payment not found', async () => {
    mockPaymentService.findOne.mockRejectedValue(new NotFoundException('Payment topilmadi'));

    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });


  it('should update a payment', async () => {
    const dto: UpdatePaymentDto = { status: 'success' };
    const updatedPayment = { id: '1', ...dto };

    mockPaymentService.update.mockResolvedValue(updatedPayment);

    expect(await controller.update('1', dto)).toEqual(updatedPayment);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should throw NotFoundException if update fails', async () => {
    mockPaymentService.update.mockRejectedValue(new NotFoundException('Payment topilmadi'));

    await expect(controller.update('999', {})).rejects.toThrow(NotFoundException);
  });


  it('should delete a payment', async () => {
    const result = { message: 'Payment o‘chirildi' };
    mockPaymentService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toEqual(result);
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if delete fails', async () => {
    mockPaymentService.remove.mockRejectedValue(new NotFoundException('Payment topilmadi'));

    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });
});
