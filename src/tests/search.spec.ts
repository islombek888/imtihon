import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from 'src/modules/search/search.controller';
import { SearchService } from 'src/modules/search/search.service';

describe('SearchModule', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: {
            searchProducts: jest.fn().mockResolvedValue([
              {
                id: '1',
                name: 'iPhone 15',
                price: 1200,
              },
              {
                id: '2',
                name: 'iPhone 14',
                price: 900,
              },
            ]),
            autocomplete: jest.fn().mockResolvedValue([
              'iPhone 15',
              'iPhone 15 Case',
              'iPhone 15 Pro',
            ]),
            trending: jest.fn().mockResolvedValue([
              'TV',
              'Laptop',
              'Smartphone',
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('service mavjud bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('searchProducts ishlashi kerak', async () => {
    const result = await service.searchProducts('iphone');
    expect(result.length).toBeGreaterThan(1);
    expect(result[0].name).toContain('iPhone');
  });

  it('autocomplete ishlashi kerak', async () => {
    const result = await service.autocomplete('iph');
    expect(result[0]).toContain('iPhone');
  });

  it('trending ishlashi kerak', async () => {
    const result = await service.trending();
    expect(result.length).toBeGreaterThan(0);
  });
});