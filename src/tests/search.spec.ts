import { Test, TestingModule } from '@nestjs/testing';
import { SearchDto } from 'src/modules/search/dto/search.dto';
import { SearchController } from 'src/modules/search/search.controller';
import { SearchService } from 'src/modules/search/search.service';


describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;

  const mockSearchService = {
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        { provide: SearchService, useValue: mockSearchService },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);
  });


  it('should search products successfully', async () => {
    const queryDto: SearchDto = {
      query: 'phone',
      category: 'electronics',
      brand: 'Apple',
    };

    const result = [
      { id: '1', name: 'iPhone 15', category: 'electronics', brand: 'Apple' },
      { id: '2', name: 'iPhone 14', category: 'electronics', brand: 'Apple' },
    ];

    mockSearchService.search.mockResolvedValue(result);

    expect(await controller.search(queryDto)).toEqual(result);
    expect(service.search).toHaveBeenCalledWith(queryDto);
  });

  it('should search without filters', async () => {
    const queryDto: SearchDto = {};

    const result = [{ id: '1', name: 'Some Product' }];

    mockSearchService.search.mockResolvedValue(result);

    expect(await controller.search(queryDto)).toEqual(result);
    expect(service.search).toHaveBeenCalledWith(queryDto);
  });
});
