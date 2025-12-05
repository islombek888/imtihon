import { Test } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AuthService } from '../modules/auth/auth.service';
import { AuthController } from '../modules/auth/auth.controller';
import { UserService } from '../modules/user/user.service';



describe('AUTH MODULE — FULL TEST', () => {
    let app: INestApplication;


    const mockUserService = {
        findByEmail: jest.fn(),
        create: jest.fn(),
    };


    describe('AuthService', () => {
        let service: AuthService;

        const res: any = {
            cookie: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                providers: [
                    AuthService,
                    { provide: UserService, useValue: mockUserService },
                ],
            }).compile();

            service = module.get(AuthService);
        });

        it('AuthService mavjud bo‘lishi kerak', () => {
            expect(service).toBeDefined();
        });

        it('login() user topilmasa error qaytarishi kerak', async () => {
            mockUserService.findByEmail.mockResolvedValue(null);

            await expect(
                service.login({ email: 'test@mail.com', password: '1234' }, res)
            ).rejects.toThrow('User not found');
        });
    });

    describe('AuthController', () => {
        let controller: AuthController;

        const res: any = {
            cookie: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockAuthService = {
            register: jest.fn(),
            login: jest.fn(),
        };

        beforeEach(async () => {
            const module = await Test.createTestingModule({
                controllers: [AuthController],
                providers: [{ provide: AuthService, useValue: mockAuthService }],
            }).compile();

            controller = module.get(AuthController);
        });

        it('AuthController mavjud bo‘lishi kerak', () => {
            expect(controller).toBeDefined();
        });

        it('register() → AuthService.register chaqirilishi kerak', async () => {

            const dto = {
                fullName: 'Test User',
                email: 't@gmail.com',
                password: '1234'
            };

            mockAuthService.register.mockResolvedValue({ id: 1, ...dto });

            const result = await controller.register(dto, res);

            expect(mockAuthService.register).toHaveBeenCalledWith(dto, res);
            expect(result).toHaveProperty('id');
        });


        it('login() → AuthService.login chaqirilishi kerak', async () => {
            const dto = { email: 't@gmail.com', password: '1234' };
            mockAuthService.login.mockResolvedValue({ token: 'fake-token' });

            const result = await controller.login(dto, res);

            expect(mockAuthService.login).toHaveBeenCalledWith(dto, res);
            expect(result).toHaveProperty('token');
        });
    });

    describe('AUTH E2E Test', () => {
        beforeAll(async () => {
            const moduleRef = await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

            app = moduleRef.createNestApplication();

            app.use(helmet());
            app.use(cookieParser());
            app.useGlobalPipes(
                new ValidationPipe({
                    whitelist: true,
                    transform: true,
                }),
            );

            await app.init();
        });

        afterAll(async () => {
            await app.close();
        });

        it('/api/auth/register (POST) → 201 qaytarishi kerak', async () => {
            return request(app.getHttpServer())
                .post('/api/auth/register')
                .send({
                    email: 'auth@test.com',
                    password: '123456',
                })
                .expect(201);
        });

        it('/api/auth/login (POST) → 201 token qaytarishi kerak', async () => {
            return request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: 'auth@test.com',
                    password: '123456',
                })
                .expect(201);
        });
    });

   

});
