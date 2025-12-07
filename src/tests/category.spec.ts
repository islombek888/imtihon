import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CategoryController } from 'src/modules/category/category.controller';
import { CategoryService } from 'src/modules/category/category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });


  it('should create category', async () => {
    const dto = { name: 'Phones', slug: 'phones' };
    const result = { id: '1', ...dto };

    mockCategoryService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should throw error if slug exists', async () => {
    const dto = { name: 'Phones', slug: 'phones' };

    mockCategoryService.create.mockRejectedValue(
      new BadRequestException('Bunday category mavjud'),
    );

    await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
  });


  it('should return all categories', async () => {
    const data = [{ id: '1', name: 'Phones' }];

    mockCategoryService.findAll.mockResolvedValue(data);

    expect(await controller.findAll()).toEqual(data);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one category', async () => {
    const data = { id: '1', name: 'Phones' };

    mockCategoryService.findOne.mockResolvedValue(data);

    expect(await controller.findOne('1')).toEqual(data);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFound for missing category', async () => {
    mockCategoryService.findOne.mockRejectedValue(
      new NotFoundException('Category topilmadi'),
    );

    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update category', async () => {
    const dto = { name: 'New Name' };
    const result = { id: '1', name: 'New Name' };

    mockCategoryService.update.mockResolvedValue(result);

    expect(await controller.update('1', dto)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should throw NotFound on update missing category', async () => {
    const dto = { name: 'New Name' };

    mockCategoryService.update.mockRejectedValue(
      new NotFoundException('Category topilmadi'),
    );

    await expect(controller.update('999', dto)).rejects.toThrow(NotFoundException);
  });


  it('should delete category', async () => {
    const result = { message: 'O‘chirildi' };

    mockCategoryService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toEqual(result);
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('should throw NotFound on delete missing category', async () => {
    mockCategoryService.remove.mockRejectedValue(
      new NotFoundException('Category topilmadi'),
    );

    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });


  it('should add product to category', async () => {
    const result = { id: '1', products: ['p1'] };

    mockCategoryService.addProduct.mockResolvedValue(result);

    expect(await controller.addProduct('1', 'p1')).toEqual(result);
    expect(service.addProduct).toHaveBeenCalledWith('1', 'p1');
  });

  it('should throw NotFound if category missing', async () => {
    mockCategoryService.addProduct.mockRejectedValue(
      new NotFoundException('Category topilmadi'),
    );

    await expect(controller.addProduct('999', 'p1')).rejects.toThrow(
      NotFoundException,
    );
  });
});
