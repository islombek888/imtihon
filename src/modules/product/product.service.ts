import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.schema';
import { ProductFilterDto } from './dto/product-filter.dto';
import { getPagination } from 'src/utils/pagination';
import { buildSort } from './filters/sort-builder.util';
import { buildProductMatch } from './filters/filters-builder.utils';

@Injectable()
export class ProductService {
  [x: string]: any;
 async findById(id: string): Promise<any> {
   return await this.productModel.findById(id).lean();
}

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findAllWithFilters(filterDto: ProductFilterDto) {
    const match = buildProductMatch(filterDto);
    const sort = buildSort(filterDto.sortBy);
    const { skip, take } = getPagination(filterDto.page, filterDto.limit);

    
    const pipeline: any[] = [
      { $match: match },

    
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },

     
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          discount: 1,
          stock: 1,
          images: 1,
          brand: 1,
          category: 1,
          rating: 1,
          salesCount: 1,
          specs: 1,
          createdAt: 1,
        },
      },


      { $sort: sort },

     
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: skip }, { $take:take }],
        },
      },
    ];

    const result = await this.productModel.aggregate(pipeline).exec();

    const metadata = result[0].metadata[0] || { total: 0 };
    return {
      total: metadata.total,
     
      data: result[0].data,
    };
  }

  async findAll() {
    return this.productModel
      .find()
      .populate('categoryId')
      .exec();
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate('categoryId');

    if (!product) throw new NotFoundException('Product topilmadi');

    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const updated = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Product topilmadi');

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.productModel.findByIdAndDelete(id);

    if (!deleted) throw new NotFoundException('Product topilmadi');

    return { message: 'Product o‘chirildi' };
  }
}