import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Variation extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  sku: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const VariationSchema = SchemaFactory.createForClass(Variation);