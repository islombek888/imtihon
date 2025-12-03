import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Promo extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  type: 'percent' | 'amount'; 

  @Prop({ required: true })
  value: number; 

  @Prop({ default: 0 })
  minPrice: number; 

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const PromoSchema = SchemaFactory.createForClass(Promo);