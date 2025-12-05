import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressModule } from 'src/modules/address/address.module';


describe('Address Module (e2e)', () => {
  let app: INestApplication;
  let addressId = '';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/test_db'),
        AddressModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Address create', async () => {
    const res = await request(app.getHttpServer())
      .post('/address')
      .send({
        user: '6742c41f0000000000000001', // fake ObjectId
        region: 'Xorazm',
        district: 'Urganch',
        street: 'Amir Temur',
        house: '12A',
      });

    expect(res.status).toBe(201);
    expect(res.body.region).toBe('Xorazm');
    addressId = res.body._id;
  });

  it('Address list', async () => {
    const res = await request(app.getHttpServer())
      .get('/address');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Address find by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/address/${addressId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(addressId);
  });

  it('Address update', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/address/${addressId}`)
      .send({ street: 'Yangi Ko‘cha' });

    expect(res.status).toBe(200);
    expect(res.body.street).toBe('Yangi Ko‘cha');
  });

  it('Address delete', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/address/${addressId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(addressId);
  });

  afterAll(async () => {
    await app.close();
  });
});