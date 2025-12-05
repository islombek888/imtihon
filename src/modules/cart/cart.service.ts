import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Model, Types } from 'mongoose';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';

@Injectable()
export class CartService {
  async getUserCart(userId: string): Promise<any> {
   return await this.cartModel.findOne({ user: userId }).lean();
}

  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  private async getOrCreateCart(userId: string) {
    let cart = await this.cartModel.findOne({ userId });

    if (!cart) {
      cart = await this.cartModel.create({
        userId,
        items: [],
        totalPrice: 0,
      });
    }

    return cart;
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    const cart = await this.getOrCreateCart(userId);

    const productObjectId = new Types.ObjectId(dto.productId);

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productObjectId.toString(),
    );

    if (existingItem) {
      existingItem.quantity += dto.quantity;
    } else {
 
      cart.items.push({
        productId: productObjectId,
        quantity: dto.quantity,
        price: 100000,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (a, b) => a + b.price * b.quantity,
      0,
    );

    return cart.save();
  }

  async updateQuantity(userId: string, dto: UpdateQuantityDto) {
    const cart = await this.getOrCreateCart(userId);

    const item = cart.items.find(
      (i) => i.productId.toString() === dto.productId,
    );

    if (!item) throw new NotFoundException('Mahsulot savatchada yo‘q');

    item.quantity = dto.quantity;

    cart.totalPrice = cart.items.reduce(
      (a, b) => a + b.price * b.quantity,
      0,
    );

    return cart.save();
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.getOrCreateCart(userId);

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    cart.totalPrice = cart.items.reduce(
      (a, b) => a + b.price * b.quantity,
      0,
    );

    return cart.save();
  }

  async getMyCart(userId: string) {
    return this.cartModel
      .findOne({ userId })
      .populate('items.productId');
  }
  
  async clearCart(userId: string) {
    return this.cartModel.findOneAndUpdate(
      { userId },
      { items: [], totalPrice: 0 },
      { new: true },
    );
  }
}