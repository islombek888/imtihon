import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/modules/admin/admin.module';


describe('Admin Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_db'),
        AdminModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let adminId = '';

  it('Admin create', async () => {
    const res = await request(app.getHttpServer())
      .post('/admin')
      .send({
        fullName: 'Test Admin',
        email: 'admin@test.com',
        password: '123456',
        role: 'admin',
      });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('admin@test.com');
    adminId = res.body._id;
  });

  it('Admin list', async () => {
    const res = await request(app.getHttpServer())
      .get('/admin');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Admin find by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/admin/${adminId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(adminId);
  });

  it('Admin update', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/admin/${adminId}`)
      .send({ fullName: 'Updated Admin' });

    expect(res.status).toBe(200);
    expect(res.body.fullName).toBe('Updated Admin');
  });

  it('Admin delete', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/admin/${adminId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(adminId);
  });

  afterAll(async () => {
    await app.close();
  });
});