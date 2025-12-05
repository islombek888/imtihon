import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from 'src/modules/cart/cart.module';


describe('Cart Module (e2e)', () => {
  let app: INestApplication;
  let cartId = '';

  const fakeUser = '6742c41f0000000000000001';
  const fakeProduct = '6742c41f0000000000000002';

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_db'),
        CartModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /cart → mahsulot cartga qo‘shish', async () => {
    const res = await request(app.getHttpServer())
      .post('/cart')
      .send({
        user: fakeUser,
        product: fakeProduct,
        quantity: 2,
      });

    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(2);

    cartId = res.body._id;
  });

  it('GET /cart/user/:id → user cartini olish', async () => {
    const res = await request(app.getHttpServer()).get(`/cart/user/${fakeUser}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PATCH /cart/:id → cart item update', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/cart/${cartId}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(5);
  });

  it('DELETE /cart/:id → cart item delete', async () => {
    const res = await request(app.getHttpServer()).delete(`/cart/${cartId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(cartId);
  });

  afterAll(async () => {
    await app.close();
  });
});