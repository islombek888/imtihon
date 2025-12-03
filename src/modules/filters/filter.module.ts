import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../product/product.schema';
import { FiltersController } from './filter.controller';
import { FiltersService } from './filter.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  controllers: [FiltersController],
  providers: [FiltersService],
})
export class FiltersModule {}