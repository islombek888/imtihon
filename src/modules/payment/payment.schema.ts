import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Order } from '../order/schema/order.schema';
import { User } from '../user/user.schema';


@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  orderId: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: ['pending', 'success', 'failed'], default: 'pending' })
  status: string;

  @Prop()
  paymentMethod: string; 

  @Prop()
  transactionId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);