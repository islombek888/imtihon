import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './notification.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}


  async sendNotification(dto: CreateNotificationDto) {
    return await this.notificationModel.create(dto);
  }


  async getUserNotifications(userId: string) {
    return await this.notificationModel
      .find({ userId })
      .sort({ createdAt: -1 });
  }


  async markAsRead(id: string) {
    const notif = await this.notificationModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );
    if (!notif) throw new NotFoundException('Xabar topilmadi');
    return notif;
  }


  async markAllRead(userId: string) {
    await this.notificationModel.updateMany(
      { userId },
      { isRead: true },
    );
    return { message: 'Barcha xabarlar o‘qilgan deb belgilandi' };
  }

  
  async deleteNotification(id: string) {
    const n = await this.notificationModel.findByIdAndDelete(id);
    if (!n) throw new NotFoundException('Xabar topilmadi');
    return { message: 'Xabar o‘chirildi' };
  }

 
  async deleteAll(userId: string) {
    await this.notificationModel.deleteMany({ userId });
    return { message: 'Barcha xabarlar tozalandi' };
  }
}