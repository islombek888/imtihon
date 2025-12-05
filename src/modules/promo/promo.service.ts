import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePromoDto } from './dto/create-promo.dto';
import { ApplyPromoDto } from './dto/apply-promo.dto';
import { Promo } from './promo.schema';

@Injectable()
export class PromoService {
  [x: string]: any;
  constructor(
    @InjectModel(Promo.name) private promoModel: Model<Promo>,
  ) {}

  async create(dto: CreatePromoDto) {
    return this.promoModel.create(dto);
  }

  async findAll() {
    return this.promoModel.find();
  }

  async findOne(id: string) {
    const promo = await this.promoModel.findById(id);
    if (!promo) throw new NotFoundException('Promo topilmadi');
    return promo;
  }

  async applyPromo(dto: ApplyPromoDto) {
    const promo = await this.promoModel.findOne({ code: dto.code });

    if (!promo) throw new NotFoundException('Promo topilmadi');
    if (!promo.isActive) throw new BadRequestException('Promo aktiv emas');

    if (new Date(promo.expiresAt).getTime() < Date.now()) {
      throw new BadRequestException('Promo muddati tugagan');
    }

    if (dto.cartTotal < promo.minPrice) {
      throw new BadRequestException(
        `Promo faqat ${promo.minPrice} so‘mdan katta summada ishlaydi`,
      );
    }

    let discount = 0;

    if (promo.type === 'percent') {
      discount = (dto.cartTotal * promo.value) / 100;
    } else {
      discount = promo.value;
    }

    return {
      promo: promo.code,
      discount,
      totalAfterDiscount: dto.cartTotal - discount,
    };
  }
}