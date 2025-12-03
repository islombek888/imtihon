import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const payment = await this.paymentModel.create({
      ...dto,
      status: 'pending',
    });
    return payment;
  }

  async findAll() {
    return this.paymentModel
      .find()
      .populate('userId')
      .populate('orderId')
      .exec();
  }

  async findOne(id: string) {
    const payment = await this.paymentModel
      .findById(id)
      .populate('userId')
      .populate('orderId');

    if (!payment) throw new NotFoundException('Payment topilmadi');

    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!payment) throw new NotFoundException('Payment topilmadi');

    return payment;
  }

  async remove(id: string) {
    const payment = await this.paymentModel.findByIdAndDelete(id);
    if (!payment) throw new NotFoundException('Payment topilmadi');
    return { message: 'Payment o‘chirildi' };
  }
}