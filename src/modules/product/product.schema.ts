import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from '../category/schemas/category.schema';


@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: Category;

  @Prop([String])
  images: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);