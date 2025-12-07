import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { NotificationController } from 'src/modules/notification/notification.controller';
import { NotificationService } from 'src/modules/notification/notification.service';
import { CreateNotificationDto } from 'src/modules/notification/dto/create-notification.dto';


describe('NotificationController', () => {
  let controller: NotificationController;
  let service: NotificationService;

  const mockNotificationService = {
    sendNotification: jest.fn(),
    getUserNotifications: jest.fn(),
    markAsRead: jest.fn(),
    markAllRead: jest.fn(),
    deleteNotification: jest.fn(),
    deleteAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    service = module.get<NotificationService>(NotificationService);
  });


  it('should create a notification', async () => {
    const dto: CreateNotificationDto = {
      userId: 'user1',
      title: 'New Order',
      message: 'Your order is confirmed',
      type: 'order',
    };
    const result = { ...dto, id: '1' };

    mockNotificationService.sendNotification.mockResolvedValue(result);

    expect(await controller.createNotification(dto)).toEqual(result);
    expect(service.sendNotification).toHaveBeenCalledWith(dto);
  });


  it('should return user notifications', async () => {
    const userId = 'user1';
    const notifications = [{ id: '1', title: 'test' }];

    mockNotificationService.getUserNotifications.mockResolvedValue(notifications);

    expect(await controller.getUserNotifications(userId)).toEqual(notifications);
    expect(service.getUserNotifications).toHaveBeenCalledWith(userId);
  });


  it('should mark a notification as read', async () => {
    const notif = { id: '1', isRead: true };
    mockNotificationService.markAsRead.mockResolvedValue(notif);

    expect(await controller.markAsRead('1')).toEqual(notif);
    expect(service.markAsRead).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if markAsRead fails', async () => {
    mockNotificationService.markAsRead.mockRejectedValue(
      new NotFoundException('Xabar topilmadi'),
    );

    await expect(controller.markAsRead('999')).rejects.toThrow(NotFoundException);
  });

  
  it('should mark all notifications as read', async () => {
    const result = { message: 'Barcha xabarlar o‘qilgan deb belgilandi' };
    mockNotificationService.markAllRead.mockResolvedValue(result);

    expect(await controller.markAll('user1')).toEqual(result);
    expect(service.markAllRead).toHaveBeenCalledWith('user1');
  });

 
  it('should delete a notification', async () => {
    const result = { message: 'Xabar o‘chirildi' };
    mockNotificationService.deleteNotification.mockResolvedValue(result);

    expect(await controller.delete('1')).toEqual(result);
    expect(service.deleteNotification).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if deleteNotification fails', async () => {
    mockNotificationService.deleteNotification.mockRejectedValue(
      new NotFoundException('Xabar topilmadi'),
    );

    await expect(controller.delete('999')).rejects.toThrow(NotFoundException);
  });


  it('should delete all notifications for user', async () => {
    const result = { message: 'Barcha xabarlar tozalandi' };
    mockNotificationService.deleteAll.mockResolvedValue(result);

    expect(await controller.deleteAll('user1')).toEqual(result);
    expect(service.deleteAll).toHaveBeenCalledWith('user1');
  });
});
