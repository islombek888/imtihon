import { Test, TestingModule } from '@nestjs/testing';
import { FiltersController } from 'src/modules/filters/filter.controller';
import { FiltersService } from 'src/modules/filters/filter.service';
import { ProductFilterDto } from 'src/modules/product/dto/product-filter.dto';


describe('FiltersController', () => {
  let controller: FiltersController;
  let service: FiltersService;

  const mockFiltersService = {
    filter: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiltersController],
      providers: [
        {
          provide: FiltersService,
          useValue: mockFiltersService,
        },
      ],
    }).compile();

    controller = module.get<FiltersController>(FiltersController);
    service = module.get<FiltersService>(FiltersService);
  });


  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should filter products', async () => {
    const query: ProductFilterDto = {
      categoryId: 'phones',
      brand: 'Apple',
      priceMin: 500,
      priceMax: 2000,
      inStock: true,
      sort: 'price_asc',
    };

    const mockResult = [
      { name: 'iPhone 14', price: 1500, category: 'phones', brand: 'Apple', inStock: true },
    ];

    mockFiltersService.filter.mockResolvedValue(mockResult);

    const result = await controller.filterProducts(query);

    expect(result).toEqual(mockResult);
    expect(mockFiltersService.filter).toHaveBeenCalledWith(query);
  });

  it('should filter products with empty query', async () => {
    const query: ProductFilterDto = {};

    const mockResult: any[] = [];

    mockFiltersService.filter.mockResolvedValue(mockResult);

    const result = await controller.filterProducts(query);

    expect(result).toEqual(mockResult);
    expect(mockFiltersService.filter).toHaveBeenCalledWith(query);
  });
});
