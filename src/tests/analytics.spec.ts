import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsModule } from 'src/modules/analytics/analytics.module';

describe('Analytics Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_db'),
        
        AnalyticsModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('GET /analytics/stats → umumiy statistika', async () => {
    const res = await request(app.getHttpServer()).get('/analytics/stats');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalUsers');
    expect(res.body).toHaveProperty('totalOrders');
    expect(res.body).toHaveProperty('totalRevenue');
  });

  it('GET /analytics/sales → savdo statistikasi', async () => {
    const res = await request(app.getHttpServer()).get('/analytics/sales');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });

  it('GET /analytics/users → foydalanuvchilar statistikasi', async () => {
    const res = await request(app.getHttpServer()).get('/analytics/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('activeUsers');

  });

  it('GET /analytics/products → mahsulot statistikasi', async () => {
    const res = await request(app.getHttpServer()).get('/analytics/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

  });

  afterAll(async () => {
    await app.close();
  });
});