import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { CreatePickupDto } from './dto/create-pickup.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
import { City, CityDocument } from './schema/city.schema';
import { PickupDocument, PickupPoint } from './schema/pick.schema';
import { Delivery, DeliveryDocument } from './schema/delivery.schema';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
    @InjectModel(PickupPoint.name) private pickupModel: Model<PickupDocument>,
    @InjectModel(Delivery.name) private deliveryModel: Model<DeliveryDocument>,
  ) {}

 
  createCity(dto: CreateCityDto) {
    return this.cityModel.create(dto);
  }

  getCities() {
    return this.cityModel.find();
  }


  createPickup(dto: CreatePickupDto) {
    return this.pickupModel.create(dto);
  }

  getPickups() {
    return this.pickupModel.find();
  }


  createDelivery(orderId: string, method: string, address?: string, pickupPointId?: string) {
    return this.deliveryModel.create({ orderId, method, address, pickupPointId });
  }

  updateDeliveryStatus(orderId: string, dto: UpdateDeliveryStatusDto) {
    return this.deliveryModel.findOneAndUpdate({ orderId }, { status: dto.status }, { new: true });
  }

  getDelivery(orderId: string) {
    return this.deliveryModel.findOne({ orderId });
  }
}