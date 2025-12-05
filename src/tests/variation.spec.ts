import { Test, TestingModule } from '@nestjs/testing';
import { VariationController } from 'src/modules/variation/variation.controller';
import { VariationService } from 'src/modules/variation/variation.service';


describe('VariationModule', () => {
  let service: VariationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariationController],
      providers: [
        {
          provide: VariationService,
          useValue: {
            createVariation: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Color',
              values: ['Red', 'Black'],
            }),

            getAll: jest.fn().mockResolvedValue([
              {
                id: '1',
                name: 'Color',
              },
              {
                id: '2',
                name: 'Size',
              },
            ]),

            updateVariation: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Color Updated',
            }),

            deleteVariation: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<VariationService>(VariationService);
  });

  it('service mavjud bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('create variation ishlashi kerak', async () => {
    const result = await service.createVariation({
      name: 'Color',
      values: ['Red', 'Black'],
    });
    expect(result.name).toBe('Color');
  });

  it('getAll variations ishlashi kerak', async () => {
    const result = await service.getAll();
    expect(result.length).toBeGreaterThan(0);
  });

  it('update variation ishlashi kerak', async () => {
    const result = await service.updateVariation('1', { name: 'Color Updated' });
    expect(result.name).toBe('Color Updated');
  });

  it('delete variation ishlashi kerak', async () => {
    const result = await service.deleteVariation('1');
    expect(result.deleted).toBe(true);
  });
});