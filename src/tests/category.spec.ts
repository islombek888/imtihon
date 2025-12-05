import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from 'src/modules/category/category.module';


describe('Category Module (e2e)', () => {
  let app: INestApplication;
  let categoryId: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_db'),
        CategoryModule,
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /category → yangi category yaratish', async () => {
    const res = await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'Electronics',
        description: 'Phones, laptops, gadgets'
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Electronics');

    categoryId = res.body._id;
  });

  it('GET /category → hamma kategoriyalar', async () => {
    const res = await request(app.getHttpServer()).get('/category');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /category/:id → bitta kategoriyani olish', async () => {
    const res = await request(app.getHttpServer()).get(`/category/${categoryId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(categoryId);
  });

  it('PATCH /category/:id → kategoriyani yangilash', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/category/${categoryId}`)
      .send({
        name: 'Updated Electronics'
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Electronics');
  });

  it('DELETE /category/:id → kategoriyani o‘chirish', async () => {
    const res = await request(app.getHttpServer()).delete(`/category/${categoryId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(categoryId);
  });

  afterAll(async () => {
    await app.close();
  });
});