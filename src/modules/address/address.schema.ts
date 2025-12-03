import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Address extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  region: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  home: string;

  @Prop({ default: '' })
  additionalInfo: string;

  @Prop({ default: false })
  isDefault: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);