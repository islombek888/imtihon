import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CartController } from 'src/modules/cart/cart.controller';
import { CartService } from 'src/modules/cart/cart.service';


describe('CartController', () => {
  let controller: CartController;
  let service: CartService;

  const mockCartService = {
    addToCart: jest.fn(),
    updateQuantity: jest.fn(),
    removeItem: jest.fn(),
    getMyCart: jest.fn(),
    clearCart: jest.fn(),
  };

  const mockGuard = {
    canActivate: jest.fn().mockReturnValue(true),
  };

  const mockReq = {
    user: { id: 'user123' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<CartController>(CartController);
    service = module.get<CartService>(CartService);
  });

  // ============================
  // ADD TO CART
  // ============================
  it('should add item to cart', async () => {
    const dto = { productId: 'p1', quantity: 2 };
    const result = { success: true };

    mockCartService.addToCart.mockResolvedValue(result);

    expect(await controller.addToCart(mockReq, dto)).toEqual(result);
    expect(service.addToCart).toHaveBeenCalledWith('user123', dto);
  });


  it('should update quantity', async () => {
    const dto = { productId: 'p1', quantity: 5 };
    const result = { updated: true };

    mockCartService.updateQuantity.mockResolvedValue(result);

    expect(await controller.updateQuantity(mockReq, dto)).toEqual(result);
    expect(service.updateQuantity).toHaveBeenCalledWith('user123', dto);
  });


  it('should remove item from cart', async () => {
    const result = { removed: true };

    mockCartService.removeItem.mockResolvedValue(result);

    expect(await controller.removeItem(mockReq, 'p1')).toEqual(result);
    expect(service.removeItem).toHaveBeenCalledWith('user123', 'p1');
  });


  it('should return user cart', async () => {
    const cart = { items: [], totalPrice: 0 };

    mockCartService.getMyCart.mockResolvedValue(cart);

    expect(await controller.getMyCart(mockReq)).toEqual(cart);
    expect(service.getMyCart).toHaveBeenCalledWith('user123');
  });

 
  it('should clear user cart', async () => {
    const result = { cleared: true };

    mockCartService.clearCart.mockResolvedValue(result);

    expect(await controller.clearCart(mockReq)).toEqual(result);
    expect(service.clearCart).toHaveBeenCalledWith('user123');
  });
});
