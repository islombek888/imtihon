import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string; 

  @Prop({ required: true })
  slug: string; 

  @Prop({ default: '' })
  icon: string; 

  @Prop({ default: '' })
  image: string;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  products: Types.ObjectId[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);