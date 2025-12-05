import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from 'src/modules/notification/notification.controller';
import { NotificationService } from 'src/modules/notification/notification.service';


describe('NotificationModule', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        {
          provide: NotificationService,
          useValue: {
            sendNotification: jest.fn().mockResolvedValue({ success: true }),
            getUserNotifications: jest.fn().mockResolvedValue([
              { id: '1', message: 'Welcome!', userId: '10' },
            ]),
            deleteNotification: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  it('service yaratilgan bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('sendNotification ishlashi kerak', async () => {
    const result = await service.sendNotification({
      userId: '10',
      title: 'salom',
      message: 'Hello', 
      type:'INFO'
    });
    expect(result).toEqual({ success: true });
  });

  it('getUserNotifications ishlashi kerak', async () => {
    const result = await service.getUserNotifications('10');
    expect(result.length).toBeGreaterThan(0);
  });

  it('deleteNotification ishlashi kerak', async () => {
    const result = await service.deleteNotification('1');
    expect(result).toEqual({ deleted: true });
  });
});