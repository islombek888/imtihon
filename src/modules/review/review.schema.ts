import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from '../product/product.schema';
import { User } from '../user/user.schema';


@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: Product;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: false })
  isEdited: boolean;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);