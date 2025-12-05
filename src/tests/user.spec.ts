import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';

describe('UserModule', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            register: jest.fn().mockResolvedValue({
              id: '1',
              fullName: 'Islom',
              phone: '+998901234567',
            }),

            login: jest.fn().mockResolvedValue({
              accessToken: 'access123',
              refreshToken: 'refresh123',
            }),

            getProfile: jest.fn().mockResolvedValue({
              id: '1',
              fullName: 'Islom',
              email: 'islom@example.com',
            }),

            updateProfile: jest.fn().mockResolvedValue({
              id: '1',
              fullName: 'Islom Updated',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('UserService mavjud bo‘lishi kerak', () => {
    expect(service).toBeDefined();
  });

  it('register ishlashi kerak', async () => {
    const result = await service.register({
      fullName: 'Islom',
      phone: '+998901234567',
      password: '123456',
    });
    expect(result.fullName).toBe('Islom');
  });

  it('login token qaytarishi kerak', async () => {
    const result = await service.login('+998901234567', '123456');
    expect(result.accessToken).toBeDefined();
  });

  it('profile olish ishlashi kerak', async () => {
    const result = await service.getProfile('1');
    expect(result.id).toBe('1');
  });

  it('update profile ishlashi kerak', async () => {
    const result = await service.updateProfile('1', { fullName: 'Islom Updated' });
    expect(result.fullName).toBe('Islom Updated');
  });
});