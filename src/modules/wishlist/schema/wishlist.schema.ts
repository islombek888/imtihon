import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WishlistDocument = HydratedDocument<Wishlist>;

@Schema({ timestamps: true })
export class Wishlist {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  products: Types.ObjectId[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);