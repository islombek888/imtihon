import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PromoController } from 'src/modules/promo/promo.controller';
import { PromoService } from 'src/modules/promo/promo.service';
import { CreatePromoDto } from 'src/modules/promo/dto/create-promo.dto';
import { ApplyPromoDto } from 'src/modules/promo/dto/apply-promo.dto';


describe('PromoController', () => {
  let controller: PromoController;
  let service: PromoService;

  const mockPromoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    applyPromo: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoController],
      providers: [
        { provide: PromoService, useValue: mockPromoService },
      ],
    }).compile();

    controller = module.get<PromoController>(PromoController);
    service = module.get<PromoService>(PromoService);
  });

 
  it('should create a promo', async () => {
    const dto: CreatePromoDto = {
      code: 'PROMO50',
      type: 'percent',
      value: 50,
      expiresAt: new Date().toISOString(),
      minPrice: 1000,
    };
    const result = { ...dto, id: '1' };

    mockPromoService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  // ============================
  // FIND ALL PROMOS
  // ============================
  it('should return all promos', async () => {
    const promos = [{ code: 'PROMO50', value: 50 }];
    mockPromoService.findAll.mockResolvedValue(promos);

    expect(await controller.findAll()).toEqual(promos);
    expect(service.findAll).toHaveBeenCalled();
  });


  it('should return a single promo', async () => {
    const promo = { code: 'PROMO50' };
    mockPromoService.findOne.mockResolvedValue(promo);

    expect(await controller.findOne('1')).toEqual(promo);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if promo not found', async () => {
    mockPromoService.findOne.mockRejectedValue(new NotFoundException('Promo topilmadi'));

    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

 
  it('should apply promo successfully', async () => {
    const dto: ApplyPromoDto = { code: 'PROMO50', cartTotal: 2000 };
    const result = { promo: 'PROMO50', discount: 1000, totalAfterDiscount: 1000 };

    mockPromoService.applyPromo.mockResolvedValue(result);

    expect(await controller.apply(dto)).toEqual(result);
    expect(service.applyPromo).toHaveBeenCalledWith(dto);
  });

  it('should throw NotFoundException if promo code invalid', async () => {
    mockPromoService.applyPromo.mockRejectedValue(new NotFoundException('Promo topilmadi'));

    await expect(controller.apply({ code: 'INVALID', cartTotal: 1000 })).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException if promo inactive', async () => {
    mockPromoService.applyPromo.mockRejectedValue(new BadRequestException('Promo aktiv emas'));

    await expect(controller.apply({ code: 'PROMO50', cartTotal: 1000 })).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if promo expired', async () => {
    mockPromoService.applyPromo.mockRejectedValue(new BadRequestException('Promo muddati tugagan'));

    await expect(controller.apply({ code: 'PROMO50', cartTotal: 1000 })).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if cart total < minPrice', async () => {
    mockPromoService.applyPromo.mockRejectedValue(new BadRequestException('Promo faqat 1000 so‘mdan katta summada ishlaydi'));

    await expect(controller.apply({ code: 'PROMO50', cartTotal: 500 })).rejects.toThrow(BadRequestException);
  });
});
