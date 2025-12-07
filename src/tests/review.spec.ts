import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ReviewController } from 'src/modules/review/review.controller';
import { ReviewService } from 'src/modules/review/review.service';
import { CreateReviewDto } from 'src/modules/review/dto/create-review.dto';
import { UpdateReviewDto } from 'src/modules/review/dto/update-review.dto';


describe('ReviewController', () => {
  let controller: ReviewController;
  let service: ReviewService;

  const mockReviewService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getProductRating: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        { provide: ReviewService, useValue: mockReviewService },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    service = module.get<ReviewService>(ReviewService);
  });

 
  it('should create a review', async () => {
    const dto: CreateReviewDto = {
      userId: 'user1',
      productId: 'prod1',
      rating: 5,
      comment: 'Great!',
    };
    const result = { id: '1', ...dto };

    mockReviewService.create.mockResolvedValue(result);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should throw BadRequestException if create fails', async () => {
    mockReviewService.create.mockRejectedValue(new BadRequestException('Siz bu mahsulotni sotib olmagansiz'));

    await expect(controller.create({
      userId: 'user1',
      productId: 'prod1',
      rating: 5,
      comment: 'Great!',
    })).rejects.toThrow(BadRequestException);
  });


  it('should return all reviews for a product', async () => {
    const reviews = [{ id: '1', comment: 'Nice' }];
    mockReviewService.findAll.mockResolvedValue(reviews);

    expect(await controller.findAll('prod1')).toEqual(reviews);
    expect(service.findAll).toHaveBeenCalledWith('prod1');
  });


  it('should return a single review', async () => {
    const review = { id: '1', comment: 'Nice' };
    mockReviewService.findOne.mockResolvedValue(review);

    expect(await controller.findOne('1')).toEqual(review);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if review not found', async () => {
    mockReviewService.findOne.mockRejectedValue(new NotFoundException('Review topilmadi'));

    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });


  it('should update a review', async () => {
    const dto: UpdateReviewDto = { rating: 4, comment: 'Good' };
    const updatedReview = { id: '1', ...dto, isEdited: true };

    mockReviewService.update.mockResolvedValue(updatedReview);

    expect(await controller.update('1', dto)).toEqual(updatedReview);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should throw NotFoundException if update fails', async () => {
    mockReviewService.update.mockRejectedValue(new NotFoundException('Review topilmadi'));

    await expect(controller.update('999', {})).rejects.toThrow(NotFoundException);
  });


  it('should delete a review', async () => {
    const result = { message: 'Review o‘chirildi' };
    mockReviewService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toEqual(result);
    expect(service.remove).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if delete fails', async () => {
    mockReviewService.remove.mockRejectedValue(new NotFoundException('Review topilmadi'));

    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });

  it('should return product rating', async () => {
    const ratingData = { avgRating: 4.5, totalReviews: 10 };
    mockReviewService.getProductRating.mockResolvedValue(ratingData);

    expect(await controller.getRating('prod1')).toEqual(ratingData);
    expect(service.getProductRating).toHaveBeenCalledWith('prod1');
  });
});
