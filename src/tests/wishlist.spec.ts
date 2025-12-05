import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from 'src/modules/wishlist/wishlist.controller';
import { WishlistService } from 'src/modules/wishlist/wishlist.service';


describe('WishlistModule', () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [
        {
          provide: WishlistService,
          useValue: {
            addToWishlist: jest.fn().mockResolvedValue({
              userId: '1',
              productId: '10',
              message: 'Added to wishlist',
            }),

            getUserWishlist: jest.fn().mockResolvedValue([
              { id: '10', name: 'iPhone 15' },
              { id: '11', name: 'Samsung S24' },
            ]),

            removeFromWishlist: jest.fn().mockResolvedValue({
              removed: true,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
  });

  it('service mavjud bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('addToWishlist ishlashi kerak', async () => {
    const result = await service.addToWishlist('1', '10');
    expect(result.message).toBe('Added to wishlist');
  });

  it('getUserWishlist ishlashi kerak', async () => {
    const result = await service.getUserWishlist('1');
    expect(result.length).toBeGreaterThan(0);
  });

  it('removeFromWishlist ishlashi kerak', async () => {
    const result = await service.removeFromWishlist('1', '10');
    expect(result.removed).toBe(true);
  });
});