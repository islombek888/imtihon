import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.schema';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private addressModel: Model<Address>,
  ) {}

 
  async create(dto: CreateAddressDto) {
    if (dto.isDefault) {
      await this.addressModel.updateMany(
        { userId: dto.userId },
        { isDefault: false },
      );
    }

    return await this.addressModel.create(dto);
  }

  async findUserAddresses(userId: string) {
    return await this.addressModel
      .find({ userId })
      .sort({ isDefault: -1, createdAt: -1 });
  }

  async setDefault(userId: string, addressId: string) {
    const address = await this.addressModel.findOne({ _id: addressId, userId });
    if (!address) throw new NotFoundException('Manzil topilmadi');

    await this.addressModel.updateMany({ userId }, { isDefault: false });

    address.isDefault = true;
    await address.save();

    return address;
  }

 
  async update(id: string, dto: UpdateAddressDto) {
    const address = await this.addressModel.findById(id);
    if (!address) throw new NotFoundException('Manzil topilmadi');

    if (dto.isDefault) {
      await this.addressModel.updateMany(
        { userId: address.userId },
        { isDefault: false },
      );
    }

    return await this.addressModel.findByIdAndUpdate(id, dto, { new: true });
  }

  // Delete
  async delete(id: string) {
    const removed = await this.addressModel.findByIdAndDelete(id);
    if (!removed) throw new NotFoundException('Manzil topilmadi');
    return { message: 'Manzil o‘chirildi' };
  }
}