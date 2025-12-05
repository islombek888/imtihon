import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from 'src/modules/product/product.controller';

import { ProductService } from 'src/modules/product/product.service';

describe('ProductModule', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Iphone 15',
              price: 12000000,
            }),
            findAll: jest.fn().mockResolvedValue([
              { id: '1', name: 'Iphone 15' },
              { id: '2', name: 'Samsung A55' },
            ]),
            findOne: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Iphone 15',
            }),
            update: jest.fn().mockResolvedValue({
              id: '1',
              name: 'Iphone 15 Pro',
            }),
            delete: jest.fn().mockResolvedValue({
              deleted: true,
            }),
            search: jest.fn().mockResolvedValue([
              { id: '1', name: 'Iphone 15' },
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('service yaratilgan bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('create ishlashi kerak', async () => {
    const result = await service.create({
      name: 'Iphone 15',
      price: 12000000,
      stock: 10,
    });

    expect(result.name).toBe('Iphone 15');
  });

  it('findAll ishlashi kerak', async () => {
    const result = await service.findAll();
    expect(result.length).toBeGreaterThan(1);
  });

  it('findOne ishlashi kerak', async () => {
    const result = await service.findOne('1');
    expect(result.id).toBe('1');
  });

  it('update ishlashi kerak', async () => {
    const result = await service.update('1', { name: 'Iphone 15 Pro' });
    expect(result.name).toBe('Iphone 15 Pro');
  });

  it('delete ishlashi kerak', async () => {
    const result = await service.delete('1');
    expect(result.deleted).toBe(true);
  });

  it('search ishlashi kerak', async () => {
    const result = await service.search('iphone');
    expect(result[0].name).toContain('Iphone');
  });
});