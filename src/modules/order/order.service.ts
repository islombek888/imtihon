import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CartService } from '../cart/cart.service';
import { ProductService } from '../product/product.service';
import { Order, OrderDocument } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto.';

@Injectable()
export class OrderService {
  [x: string]: any;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  async create(userId: string, dto: CreateOrderDto) {

    const cart = await this.cartService.getUserCart(userId);

    if (!cart || !cart.items || cart.items.length === 0)
      throw new BadRequestException('Savatcha bo‘sh!');

    let totalPrice = 0;

    const items = await Promise.all(
  cart.items.map(async (item) => {
    const product = await this.productService.findById(item.product);

    if (!product) throw new NotFoundException("Mahsulot topilmadi");

    totalPrice += product.price * item.quantity;

    return {
      product: new Types.ObjectId(product._id),
      quantity: item.quantity,
      price: product.price,
    };
  }),
);
    
    if (dto.promoCode) {
      if (totalPrice < 100000)
        throw new BadRequestException(
          'Umumiy narx 100 000 so‘mdan katta bo‘lishi kerak',
        );
      totalPrice -= 20000;
    }

    
    let deliveryPrice = 0;
    if (dto.payment.method === 'fast') deliveryPrice = 20000;

    const finalPrice = totalPrice + deliveryPrice;

    const order = await this.orderModel.create({
      user: new Types.ObjectId(userId),
      items,
      totalPrice,
      deliveryPrice,
      finalPrice,
      deliveryInfo: dto.deliveryInfo,
      payment: dto.payment,
      status: dto.payment.method === 'cash' ? 'pending' : 'paid',
    });

    
    await this.cartService.clearCart(userId);

    return order;
  }

  async getMyOrders(userId: string) {
    return this.orderModel
      .find({ user: userId })
      .populate('items.product');
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).populate('items.product');
    if (!order) throw new NotFoundException('Order topilmadi');
    return order;
  }

  async updateStatus(id: string, status: string) {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!order) throw new NotFoundException('Order topilmadi');
    return order;
  }
}
