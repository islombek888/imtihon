import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Create notification manually (admin)
  @Post()
  createNotification(@Body() dto: CreateNotificationDto) {
    return this.notificationService.sendNotification(dto);
  }

  // Get user's notifications
  @Get(':userId')
  getUserNotifications(@Param('userId') userId: string) {
    return this.notificationService.getUserNotifications(userId);
  }

  // Mark one as read
  @Patch('read/:id')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  // Mark all as read
  @Patch('read-all/:userId')
  markAll(@Param('userId') userId: string) {
    return this.notificationService.markAllRead(userId);
  }

  // Delete one
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }

  // Delete all
  @Delete('all/:userId')
  deleteAll(@Param('userId') userId: string) {
    return this.notificationService.deleteAll(userId);
  }
}