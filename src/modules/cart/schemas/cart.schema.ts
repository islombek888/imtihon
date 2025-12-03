import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ])
  items: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);