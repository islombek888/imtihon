import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ timestamps: true })
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  districts: string[];

  @Prop({ required: true })
  deliveryPrice: number;

  @Prop({ required: true })
  deliveryTime: string;
}

export const CitySchema = SchemaFactory.createForClass(City);