import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVariationDto } from './dto/create-variation.dto';
import { UpdateVariationDto } from './dto/update-variation.dto';
import { Variation } from './schema/variation.schema';

@Injectable()
export class VariationService {
  [x: string]: any;
  constructor(
    @InjectModel(Variation.name)
    private readonly variationModel: Model<Variation>,
  ) {}

  async create(dto: CreateVariationDto) {
    return this.variationModel.create(dto);
  }

  async findAll(productId: string) {
    return this.variationModel.find({ productId });
  }

  async findOne(id: string) {
    const variation = await this.variationModel.findById(id);
    if (!variation) throw new NotFoundException('Variation not found');
    return variation;
  }

  async update(id: string, dto: UpdateVariationDto) {
    const updated = await this.variationModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Variation not found');
    return updated;
  }

  async delete(id: string) {
    return this.variationModel.findByIdAndDelete(id);
  }
}