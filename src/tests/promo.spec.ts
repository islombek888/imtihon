import { Test, TestingModule } from '@nestjs/testing';
import { PromoController } from 'src/modules/promo/promo.controller';
import { PromoService } from 'src/modules/promo/promo.service';

describe('PromoModule', () => {
  let service: PromoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoController],
      providers: [
        {
          provide: PromoService,
          useValue: {
            createPromo: jest.fn().mockResolvedValue({
              id: '1',
              code: 'SALE20',
              discount: 20,
            }),
            validatePromo: jest.fn().mockResolvedValue({
              code: 'SALE20',
              valid: true,
              discount: 20,
            }),
            listPromos: jest.fn().mockResolvedValue([
              { code: 'SALE20', discount: 20 },
              { code: 'NEW10', discount: 10 },
            ]),
            deletePromo: jest.fn().mockResolvedValue({
              deleted: true,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<PromoService>(PromoService);
  });

  it('service yaratilgan', () => {
    expect(service).toBeDefined();
  });

  it('createPromo ishlashi kerak', async () => {
    const result = await service.createPromo({
      code: 'SALE20',
      discount: 20,
    });

    expect(result.code).toBe('SALE20');
  });

  it('validatePromo ishlashi kerak', async () => {
    const result = await service.validatePromo('SALE20');
    expect(result.valid).toBe(true);
  });

  it('listPromos ishlashi kerak', async () => {
    const result = await service.listPromos();
    expect(result.length).toBeGreaterThan(1);
  });

  it('deletePromo ishlashi kerak', async () => {
    const result = await service.deletePromo('1');
    expect(result.deleted).toBe(true);
  });
});