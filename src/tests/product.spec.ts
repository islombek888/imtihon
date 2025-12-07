import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from 'src/modules/product/product.controller';
import { ProductService } from 'src/modules/product/product.service';


describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ProductService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('controller mavjud bo‘lishi kerak', () => {
    expect(controller).toBeDefined();
  });

  it('create ishlashi kerak', async () => {
    const dto = { name: 'Test', price: 100, stock: 10 };
    mockService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);
    expect(result).toEqual(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findAll ishlashi kerak', async () => {
    const items = [{ name: 'A' }];
    mockService.findAll.mockResolvedValue(items);

    const result = await controller.findAll();
    expect(result).toEqual(items);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne ishlashi kerak', async () => {
    const item = { id: '1', name: 'A' };
    mockService.findOne.mockResolvedValue(item);

    const result = await controller.findOne('1');
    expect(result).toEqual(item);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('update ishlashi kerak', async () => {
    const dto = { price: 200 };
    const updated = { id: '1', price: 200 };
    mockService.update.mockResolvedValue(updated);

    const result = await controller.update('1', dto);
    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('remove ishlashi kerak', async () => {
    const res = { message: 'Product o‘chirildi' };
    mockService.remove.mockResolvedValue(res);

    const result = await controller.remove('1');
    expect(result).toEqual(res);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});