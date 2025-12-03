import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeliveryDocument = Delivery & Document;

@Schema({ timestamps: true })
export class Delivery {
  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  method: string; 

  @Prop()
  address?: string;

  @Prop()
  pickupPointId?: string;

  @Prop({ default: 'pending' })
  status: string; 
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);