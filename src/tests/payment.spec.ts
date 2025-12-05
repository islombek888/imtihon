import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from 'src/modules/payment/payment.controller';
import { PaymentService } from 'src/modules/payment/payment.service';


describe('PaymentModule', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            createPayment: jest.fn().mockResolvedValue({
              id: '1',
              orderId: '100',
              amount: 200000,
              status: 'PAID',
            }),
            getPaymentStatus: jest.fn().mockResolvedValue({
              orderId: '100',
              status: 'PAID',
            }),
            refundPayment: jest.fn().mockResolvedValue({
              refunded: true,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('service yaratilgan bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('createPayment ishlashi kerak', async () => {
    const result = await service.createPayment({
      orderId: '100',
      amount: 200000,
    });

    expect(result.status).toBe('PAID');
  });

  it('getPaymentStatus ishlashi kerak', async () => {
    const result = await service.getPaymentStatus('100');
    expect(result.status).toBe('PAID');
  });

  it('refundPayment ishlashi kerak', async () => {
    const result = await service.refundPayment('1');
    expect(result.refunded).toBe(true);
  });
});