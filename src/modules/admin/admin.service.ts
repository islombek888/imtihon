import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../user/user.schema';
import { Order } from '../order/schema/order.schema';
import { Category } from '../category/schemas/category.schema';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}


  async createProduct(dto: CreateProductDto) {
    return await this.productModel.create(dto);
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, dto, { new: true });
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Mahsulot topilmadi');
    return { message: 'O‘chirildi' };
  }

  async getAllProducts() {
    return await this.productModel.find().populate('categoryId');
  }


  async getAllCategories() {
    return await this.categoryModel.find();
  }

  async getAllUsers() {
    return await this.userModel.find().select('-password');
  }


  async getAllOrders() {
    return await this.orderModel.find().populate('userId').populate('items.productId');
  }

  
  async getStats() {
    const users = await this.userModel.countDocuments();
    const products = await this.productModel.countDocuments();
    const orders = await this.orderModel.countDocuments();

    return {
      totalUsers: users,
      totalProducts: products,
      totalOrders: orders,
    };
  }
}