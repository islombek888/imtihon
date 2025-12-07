import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { AdminController } from 'src/modules/admin/admin.controller';
import { AdminService } from 'src/modules/admin/admin.service';
import { AdminGuard } from 'src/modules/admin/guards/admin.guard';
import { CreateProductDto } from 'src/modules/admin/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/admin/dto/update-product.dto';


describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  const mockAdminService = {
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
    getAllProducts: jest.fn(),
    getAllCategories: jest.fn(),
    getAllUsers: jest.fn(),
    getAllOrders: jest.fn(),
    getStats: jest.fn(),
  };

  const mockAdminGuard = {
    canActivate: jest.fn().mockImplementation((context) => {
      const req = context.switchToHttp().getRequest();
      if (!req.user || req.user.role !== 'admin') {
        throw new ForbiddenException('Admin huquqi kerak');
      }
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
      ],
    })
      .overrideGuard(AdminGuard)
      .useValue(mockAdminGuard)
      .compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });


  it('should create product', async () => {
    const dto: CreateProductDto = {
      name: 'iPhone',
      description: 'New phone',
      price: 1000,
      categoryId: '123',
      images: [],
      colors: ['black'],
      specs: [],
    };

    mockAdminService.createProduct.mockResolvedValue(dto);

    const result = await controller.createProduct(dto);
    expect(result).toEqual(dto);
    expect(mockAdminService.createProduct).toHaveBeenCalledWith(dto);
  });

 
  it('should update product', async () => {
    const dto: UpdateProductDto = { price: 1200 };

    mockAdminService.updateProduct.mockResolvedValue({
      id: '1',
      price: 1200,
    });

    const result = await controller.updateProduct('1', dto);
    expect(result).toEqual({ id: '1', price: 1200 });
    expect(mockAdminService.updateProduct).toHaveBeenCalledWith('1', dto);
  });

 
  it('should delete product', async () => {
    mockAdminService.deleteProduct.mockResolvedValue({ message: 'O‘chirildi' });

    const result = await controller.deleteProduct('1');
    expect(result).toEqual({ message: 'O‘chirildi' });
    expect(mockAdminService.deleteProduct).toHaveBeenCalledWith('1');
  });

 
  it('should return all products', async () => {
    const products = [{ id: '1', name: 'iPhone' }];

    mockAdminService.getAllProducts.mockResolvedValue(products);

    const result = await controller.getProducts();
    expect(result).toEqual(products);
    expect(mockAdminService.getAllProducts).toHaveBeenCalled();
  });


  it('should return categories', async () => {
    const categories = [{ id: '1', name: 'Phones' }];

    mockAdminService.getAllCategories.mockResolvedValue(categories);

    const result = await controller.getCategories();
    expect(result).toEqual(categories);
    expect(mockAdminService.getAllCategories).toHaveBeenCalled();
  });


  it('should return users', async () => {
    const users = [{ id: '1', fullName: 'Islom' }];

    mockAdminService.getAllUsers.mockResolvedValue(users);

    const result = await controller.getUsers();
    expect(result).toEqual(users);
    expect(mockAdminService.getAllUsers).toHaveBeenCalled();
  });

  it('should return orders', async () => {
    const orders = [{ id: '1', total: 200 }];

    mockAdminService.getAllOrders.mockResolvedValue(orders);

    const result = await controller.getOrders();
    expect(result).toEqual(orders);
    expect(mockAdminService.getAllOrders).toHaveBeenCalled();
  });

 
  it('should return stats', async () => {
    const stats = {
      totalUsers: 10,
      totalProducts: 5,
      totalOrders: 3,
    };

    mockAdminService.getStats.mockResolvedValue(stats);

    const result = await controller.getStats();
    expect(result).toEqual(stats);
    expect(mockAdminService.getStats).toHaveBeenCalled();
  });
});
