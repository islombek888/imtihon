import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  
  @Post()
  createNotification(@Body() dto: CreateNotificationDto) {
    return this.notificationService.sendNotification(dto);
  }

  
  @Get(':userId')
  getUserNotifications(@Param('userId') userId: string) {
    return this.notificationService.getUserNotifications(userId);
  }


  @Patch('read/:id')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

 
  @Patch('read-all/:userId')
  markAll(@Param('userId') userId: string) {
    return this.notificationService.markAllRead(userId);
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }

  @Delete('all/:userId')
  deleteAll(@Param('userId') userId: string) {
    return this.notificationService.deleteAll(userId);
  }
}