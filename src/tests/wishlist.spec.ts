import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from 'src/modules/wishlist/wishlist.controller';
import { WishlistService } from 'src/modules/wishlist/wishlist.service';


describe('WishlistController', () => {
  let controller: WishlistController;
  let service: WishlistService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addProduct: jest.fn(),
    removeProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [
        { provide: WishlistService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<WishlistController>(WishlistController);
    service = module.get<WishlistService>(WishlistService);
  });

  it('controller mavjud bo‘lishi kerak', () => {
    expect(controller).toBeDefined();
  });

  it('create ishlashi kerak', async () => {
    const dto = { userId: '1', products: [] };
    const res = { id: '1', ...dto };
    mockService.create.mockResolvedValue(res);

    const result = await controller.create(dto);
    expect(result).toEqual(res);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('findAll ishlashi kerak', async () => {
    const data = [{ id: '1' }];
    mockService.findAll.mockResolvedValue(data);

    const result = await controller.findAll();
    expect(result).toEqual(data);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne ishlashi kerak', async () => {
    const item = { id: '1' };
    mockService.findOne.mockResolvedValue(item);

    const result = await controller.findOne('1');
    expect(result).toEqual(item);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('update ishlashi kerak', async () => {
    const dto = { products: ['a'] };
    const updated = { id: '1', products: ['a'] };

    mockService.update.mockResolvedValue(updated);

    const result = await controller.update('1', dto);
    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('remove ishlashi kerak', async () => {
    const deleted = { id: '1' };
    mockService.remove.mockResolvedValue(deleted);

    const result = await controller.remove('1');
    expect(result).toEqual(deleted);
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('addProduct ishlashi kerak', async () => {
    const updated = { id: '1', products: ['a'] };
    mockService.addProduct.mockResolvedValue(updated);

    const result = await controller.addProduct('1', 'a');
    expect(result).toEqual(updated);
    expect(service.addProduct).toHaveBeenCalledWith('1', 'a');
  });

  it('removeProduct ishlashi kerak', async () => {
    const updated = { id: '1', products: [] };
    mockService.removeProduct.mockResolvedValue(updated);

    const result = await controller.removeProduct('1', 'a');
    expect(result).toEqual(updated);
    expect(service.removeProduct).toHaveBeenCalledWith('1', 'a');
  });
});