import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchDto } from './dto/search.dto';
import { Product } from '../product/product.schema';

@Injectable()
export class SearchService {
  [x: string]: any;
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async search(params: SearchDto) {
    const { query, category, brand } = params;

    const filter: any = {};

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    return this.productModel.find(filter).limit(50);
  }
}