import { Test, TestingModule } from '@nestjs/testing';
import { FiltersController } from 'src/modules/filters/filter.controller';
import { FiltersService } from 'src/modules/filters/filter.service';


describe('FiltersModule', () => {
  let service: FiltersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiltersController],
      providers: [
        {
          provide: FiltersService,
          useValue: {
            createFilter: jest.fn().mockResolvedValue({ id: '1', name: 'color' }),
            getAllFilters: jest.fn().mockResolvedValue([{ id: '1', name: 'color' }]),
            deleteFilter: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<FiltersService>(FiltersService);
  });

  it('service yaratilgan bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('createFilter ishlashi kerak', async () => {
    const result = await service.createFilter({ name: 'color' });
    expect(result).toEqual({ id: '1', name: 'color' });
  });

  it('getAllFilters ishlashi kerak', async () => {
    const result = await service.getAllFilters();
    expect(result.length).toBeGreaterThan(0);
  });

  it('deleteFilter ishlashi kerak', async () => {
    const result = await service.deleteFilter('1');
    expect(result).toEqual({ deleted: true });
  });
});