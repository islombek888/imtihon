import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { City, CitySchema } from './schema/city.schema';
import { PickupPoint, PickupSchema } from './schema/pick.schema';
import { Delivery, DeliverySchema } from './schema/delivery.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: PickupPoint.name, schema: PickupSchema },
      { name: Delivery.name, schema: DeliverySchema },
    ]),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}