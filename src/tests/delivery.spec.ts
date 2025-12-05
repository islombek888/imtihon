import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryModule } from 'src/modules/delivery/delivery.module';


describe('Delivery Module (e2e)', () => {
  let app: INestApplication;
  let deliveryId: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_db'),
        DeliveryModule,
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /delivery → yangi delivery zone yaratish', async () => {
    const res = await request(app.getHttpServer())
      .post('/delivery')
      .send({
        name: 'Tashkent — Yunusobod',
        price: 15000,
        estimatedTime: '30-45 min'
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Tashkent — Yunusobod');

    deliveryId = res.body._id;
  });

  it('GET /delivery → barcha delivery zonelar', async () => {
    const res = await request(app.getHttpServer()).get('/delivery');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /delivery/:id → bitta zoneni olish', async () => {
    const res = await request(app.getHttpServer()).get(`/delivery/${deliveryId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(deliveryId);
  });

  it('PATCH /delivery/:id → zoneni yangilash', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/delivery/${deliveryId}`)
      .send({
        price: 20000
      });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(20000);
  });

  it('DELETE /delivery/:id → zoneni o‘chirish', async () => {
    const res = await request(app.getHttpServer()).delete(`/delivery/${deliveryId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(deliveryId);
  });

  afterAll(async () => {
    await app.close();
  });
});