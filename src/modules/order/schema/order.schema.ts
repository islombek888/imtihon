import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
    },
  ])
  items: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop()
  deliveryPrice: number;

  @Prop()
  finalPrice: number;

  @Prop({
    type: {
      fullName: String,
      phone: String,
      address: String,
      region: String,
      district: String,
    },
  })
  deliveryInfo: {
    fullName: string;
    phone: string;
    address: string;
    region: string;
    district: string;
  };

  @Prop({
    type: {
      method: String, // cash, card
      cardNumber: String,
      expiry: String,
      cvv: String,
    },
  })
  payment: {
    method: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
  };

  @Prop({
    type: String,
    enum: ['pending', 'paid', 'delivered', 'canceled'],
    default: 'pending',
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);