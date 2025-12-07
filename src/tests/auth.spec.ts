import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtRefreshGuard } from 'src/modules/auth/guards/jwt-refresh.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    refresh: jest.fn(),
    logout: jest.fn(),
  };

  const mockJwtRefreshGuard = {
    canActivate: jest.fn().mockReturnValue(true),
  };

  const mockResponse: any = {
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    })
      .overrideGuard(JwtRefreshGuard)
      .useValue(mockJwtRefreshGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });


  it('should register user', async () => {
    const dto = { fullName: 'Islom', email: 'test@mail.com', password: '123456' };
    const result = { message: 'Success', accessToken: 'aaa', user: { id: '1' } };

    mockAuthService.register.mockResolvedValue(result);

    expect(await controller.register(dto, mockResponse)).toEqual(result);
    expect(mockAuthService.register).toHaveBeenCalledWith(dto, mockResponse);
  });

  it('should throw error if email exists', async () => {
    const dto = { fullName: 'Islom', email: 'test@mail.com', password: '123456' };

    mockAuthService.register.mockRejectedValue(new BadRequestException('Email already exists'));

    await expect(controller.register(dto, mockResponse)).rejects.toThrow(
      BadRequestException,
    );
  });


  it('should login user', async () => {
    const dto = { email: 'test@mail.com', password: '123456' };
    const result = { accessToken: 'token', user: { id: '1' } };

    mockAuthService.login.mockResolvedValue(result);

    expect(await controller.login(dto, mockResponse)).toEqual(result);
    expect(mockAuthService.login).toHaveBeenCalledWith(dto, mockResponse);
  });

  it('should throw error if invalid credentials', async () => {
    const dto = { email: 'fail@mail.com', password: 'wrong' };

    mockAuthService.login.mockRejectedValue(
      new UnauthorizedException('Invalid email or password'),
    );

    await expect(controller.login(dto, mockResponse)).rejects.toThrow(
      UnauthorizedException,
    );
  });


  it('should refresh tokens', async () => {
    const req: any = { user: { sub: '1', email: 'test@mail.com' } };
    const result = { accessToken: 'new-token' };

    mockAuthService.refresh.mockResolvedValue(result);

    expect(await controller.refresh(req, mockResponse)).toEqual(result);
    expect(mockAuthService.refresh).toHaveBeenCalledWith(req.user, mockResponse);
  });


  it('should logout user', async () => {
    const result = { message: 'Logged out' };

    mockAuthService.logout.mockResolvedValue(result);

    expect(await controller.logout(mockResponse)).toEqual(result);
    expect(mockAuthService.logout).toHaveBeenCalledWith(mockResponse);
  });
});
