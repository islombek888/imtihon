import {BadRequestException,Injectable,NotFoundException,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  
  async create(dto: CreateCategoryDto) {
    const exists = await this.categoryModel.findOne({
      slug: dto.slug,
    });

    if (exists) throw new BadRequestException('Bunday category mavjud');

    return this.categoryModel.create(dto);
  }


  async findAll() {
    return this.categoryModel.find().populate('products');
  }


  async findOne(id: string) {
    const category = await this.categoryModel
      .findById(id)
      .populate('products');

    if (!category) throw new NotFoundException('Category topilmadi');

    return category;
  }


  async update(id: string, dto: UpdateCategoryDto) {
    const updated = await this.categoryModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Category topilmadi');

    return updated;
  }


  async remove(id: string) {
    const deleted = await this.categoryModel.findByIdAndDelete(id);

    if (!deleted) throw new NotFoundException('Category topilmadi');

    return { message: 'O‘chirildi' };
  }

  async addProduct(categoryId: string, productId: string) {
    const category = await this.categoryModel.findById(categoryId);

    if (!category) throw new NotFoundException('Category topilmadi');

    const productObjId = new Types.ObjectId(productId);

    if (!category.products.includes(productObjId)) {
      category.products.push(productObjId);
    }

    return category.save();
  }
}