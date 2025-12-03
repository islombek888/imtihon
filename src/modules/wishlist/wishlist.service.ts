import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist, WishlistDocument } from './schema/wishlist.schema';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name)
    private wishlistModel: Model<WishlistDocument>,
  ) {}

  async create(dto: CreateWishlistDto) {
    const created = new this.wishlistModel(dto);
    return created.save();
  }

  async findAll() {
    return this.wishlistModel.find().populate(['userId', 'products']);
  }

  async findOne(id: string) {
    const wishlist = await this.wishlistModel
      .findById(id)
      .populate(['userId', 'products']);

    if (!wishlist) throw new NotFoundException('Wishlist topilmadi');

    return wishlist;
  }

  async update(id: string, dto: UpdateWishlistDto) {
    const updated = await this.wishlistModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate(['userId', 'products']);

    if (!updated) throw new NotFoundException('Wishlist topilmadi');

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.wishlistModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Wishlist topilmadi');
    return deleted;
  }


  async addProduct(wishlistId: string, productId: string) {
    return this.wishlistModel.findByIdAndUpdate(
      wishlistId,
      { $addToSet: { products: new Types.ObjectId(productId) } },
      { new: true },
    );
  }

  
  async removeProduct(wishlistId: string, productId: string) {
    return this.wishlistModel.findByIdAndUpdate(
      wishlistId,
      { $pull: { products: new Types.ObjectId(productId) } },
      { new: true },
    );
  }
}