import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from 'src/modules/delivery/delivery.controller';
import { DeliveryService } from 'src/modules/delivery/delivery.service';


describe('DeliveryController', () => {
  let controller: DeliveryController;
  let service: DeliveryService;

  const mockDeliveryService = {
    createCity: jest.fn(),
    getCities: jest.fn(),
    createPickup: jest.fn(),
    getPickups: jest.fn(),
    updateDeliveryStatus: jest.fn(),
    getDelivery: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
          provide: DeliveryService,
          useValue: mockDeliveryService,
        },
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should create city', async () => {
    const dto = {
      name: 'Tashkent',
      districts: ['Yunusobod'],
      deliveryPrice: 20000,
      deliveryTime: '1 day',
    };

    const result = { id: '1', ...dto };

    mockDeliveryService.createCity.mockResolvedValue(result);

    expect(await controller.createCity(dto)).toEqual(result);
    expect(service.createCity).toHaveBeenCalledWith(dto);
  });


  it('should return all cities', async () => {
    const cities = [{ id: '1', name: 'Tashkent' }];

    mockDeliveryService.getCities.mockResolvedValue(cities);

    expect(await controller.getCities()).toEqual(cities);
    expect(service.getCities).toHaveBeenCalled();
  });


  it('should create pickup point', async () => {
    const dto = {
      name: 'Pickup 1',
      address: 'Center',
      city: 'Tashkent',
      workingHours: '9-18',
    };

    const result = { id: '1', ...dto };

    mockDeliveryService.createPickup.mockResolvedValue(result);

    expect(await controller.createPickup(dto)).toEqual(result);
    expect(service.createPickup).toHaveBeenCalledWith(dto);
  });


  it('should return pickup points', async () => {
    const pickups = [{ id: '1', name: 'Pickup 1' }];

    mockDeliveryService.getPickups.mockResolvedValue(pickups);

    expect(await controller.getPickups()).toEqual(pickups);
    expect(service.getPickups).toHaveBeenCalled();
  });

 
  it('should update delivery status', async () => {
    const dto = { status: 'sent' };
    const result = { orderId: '123', status: 'sent' };

    mockDeliveryService.updateDeliveryStatus.mockResolvedValue(result);

    expect(await controller.updateDeliveryStatus('123', dto)).toEqual(result);
    expect(service.updateDeliveryStatus).toHaveBeenCalledWith('123', dto);
  });


  it('should return delivery by orderId', async () => {
    const delivery = {
      orderId: '123',
      status: 'pending',
    };

    mockDeliveryService.getDelivery.mockResolvedValue(delivery);

    expect(await controller.getDelivery('123')).toEqual(delivery);
    expect(service.getDelivery).toHaveBeenCalledWith('123');
  });
});
