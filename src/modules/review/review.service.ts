import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Order } from '../order/schema/order.schema';


@Injectable()
export class ReviewService {
  [x: string]: any;
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async create(dto: CreateReviewDto) {
   
    const purchased = await this.orderModel.findOne({
      userId: dto.userId,
      'items.productId': dto.productId,
      status: 'delivered',
    });

    if (!purchased) {
      throw new BadRequestException('Siz bu mahsulotni sotib olmagansiz');
    }

    
    const exists = await this.reviewModel.findOne({
      userId: dto.userId,
      productId: dto.productId,
    });

    if (exists) {
      throw new BadRequestException('Siz bu mahsulotga review yozgansiz');
    }

    return this.reviewModel.create(dto);
  }

  async findAll(productId: string) {
    return this.reviewModel
      .find({ productId })
      .populate('userId', 'name email')
      .exec();
  }

  async findOne(id: string) {
    const review = await this.reviewModel.findById(id);
    if (!review) throw new NotFoundException('Review topilmadi');
    return review;
  }

  async update(id: string, dto: UpdateReviewDto) {
    const review = await this.reviewModel.findByIdAndUpdate(
      id,
      { ...dto, isEdited: true },
      { new: true },
    );

    if (!review) throw new NotFoundException('Review topilmadi');

    return review;
  }

  async remove(id: string) {
    const review = await this.reviewModel.findByIdAndDelete(id);
    if (!review) throw new NotFoundException('Review topilmadi');

    return { message: 'Review o‘chirildi' };
  }

  async getProductRating(productId: string) {
    const reviews = await this.reviewModel.find({ productId });

    if (reviews.length === 0) return { avgRating: 0, totalReviews: 0 };

    const total = reviews.reduce((a, b) => a + b.rating, 0);
    return {
      avgRating: Number((total / reviews.length).toFixed(1)),
      totalReviews: reviews.length,
    };
  }
}