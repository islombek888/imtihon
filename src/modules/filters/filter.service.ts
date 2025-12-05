import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductFilterDto } from './dto/product-filter.dto';
import { Product } from '../product/product.schema';

@Injectable()
export class FiltersService {
  [x: string]: any;
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductFilterDto>,
  ) { }

  async filter(dto: ProductFilterDto) {
    const query: any = {};


    if (dto.category) query.category = dto.category;


    if (dto.brand) query.brand = dto.brand;


    if (dto.minPrice) query.price = { ...query.price, $gte: Number(dto.minPrice) };


    if (dto.maxPrice) query.price = { ...query.price, $lte: Number(dto.maxPrice) };


    if (dto.inStock !== undefined) {
      query.inStock = dto.inStock ;
    }


    let sort: any = {};

    switch (dto.sort) {
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'sold':
        sort = { soldCount: -1 };
        break;
      default:
        sort = {};
    }

    return this.productModel.find(query).sort(sort);
  }
}