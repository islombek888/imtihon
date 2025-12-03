import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PickupDocument = PickupPoint & Document;

@Schema({ timestamps: true })
export class PickupPoint {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  workingHours: string; 
}

export const PickupSchema = SchemaFactory.createForClass(PickupPoint);