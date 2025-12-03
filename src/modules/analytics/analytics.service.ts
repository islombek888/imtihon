import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../order/schema/order.schema';
import { Product } from '../product/product.schema';
import { User } from '../user/user.schema';


@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

 
  async getDashboard() {
    const totalUsers = await this.userModel.countDocuments();
    const totalProducts = await this.productModel.countDocuments();
    const totalOrders = await this.orderModel.countDocuments();

    const totalRevenue = await this.orderModel.aggregate([
      { $match: { status: 'SUCCESS' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);

    const revenue = totalRevenue.length ? totalRevenue[0].total : 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await this.orderModel.countDocuments({
      createdAt: { $gte: today },
    });

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      revenue,
      todayOrders,
    };
  }

  async getTopProducts(limit = 10) {
    const data = await this.orderModel.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          totalSold: { $sum: '$items.quantity' },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
    ]);

    return data;
  }

  async getWeeklyChart() {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const result = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
          status: 'SUCCESS',
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          total: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return result;
  }
}