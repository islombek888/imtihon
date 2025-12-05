import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from 'src/modules/review/review.controller';
import { ReviewService } from 'src/modules/review/review.service';

describe('ReviewModule', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              id: '1',
              user: '10',
              product: '5',
              rating: 5,
              comment: 'Zo‘r mahsulot!',
            }),
            findAllForProduct: jest.fn().mockResolvedValue([
              { id: '1', rating: 5, comment: 'Zo‘r' },
              { id: '2', rating: 4, comment: 'Yaxshi' },
            ]),
            findOne: jest.fn().mockResolvedValue({
              id: '1',
              rating: 5,
              comment: 'Zo‘r mahsulot!',
            }),
            update: jest.fn().mockResolvedValue({
              id: '1',
              rating: 4,
              comment: 'Yaxshi ekan',
            }),
            delete: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('service yaratilgan bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('create ishlashi kerak', async () => {
    const result = await service.create({
      userId: '10',
      productId: '5',
      rating: 5,
      comment: 'Zo‘r mahsulot!',
    });

    expect(result.rating).toBe(5);
  });

  it('findAllForProduct ishlashi kerak', async () => {
    const result = await service.findAllForProduct('5');
    expect(result.length).toBeGreaterThan(1);
  });

  it('findOne ishlashi kerak', async () => {
    const result = await service.findOne('1');
    expect(result.id).toBe('1');
  });

  it('update ishlashi kerak', async () => {
    const result = await service.update('1', {
      rating: 4,
      comment: 'Yaxshi ekan',
    });

    expect(result.rating).toBe(4);
  });

  it('delete ishlashi kerak', async () => {
    const result = await service.delete('1');
    expect(result.deleted).toBe(true);
  });
});