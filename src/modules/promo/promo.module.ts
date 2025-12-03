import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Promo, PromoSchema } from './promo.schema';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Promo.name, schema: PromoSchema }]),
  ],
  controllers: [PromoController],
  providers: [PromoService],
  exports: [PromoService],
})
export class PromoModule {}