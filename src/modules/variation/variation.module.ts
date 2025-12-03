import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';
import { Variation, VariationSchema } from './schema/variation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Variation.name, schema: VariationSchema },
    ]),
  ],
  controllers: [VariationController],
  providers: [VariationService],
})
export class VariationModule {}