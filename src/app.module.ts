import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './modules/payment/payment.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { ReviewModule } from './modules/review/review.module';
import { PromoModule } from './modules/promo/promo.module';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import s3Config from './config/s3.config';
import throttleConfig from './config/throttle.config';
import mailConfig from './config/mail.config';
import { LoggerModule } from './common/logger/logger.module';
import { DocumentationModule } from './modules/documentation/documentation.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { DeliveryModule } from './modules/delivery/delivery.module';

import { AdminModule } from './modules/admin/admin.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig,
        databaseConfig,
        jwtConfig,
        mailConfig,
        s3Config,
        throttleConfig,],
      isGlobal: true

    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),


    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    WishlistModule,
    CartModule,
    OrderModule,
    ReviewModule,
    PromoModule,
    PaymentModule,
    DocumentationModule,
    LoggerModule,
    AnalyticsModule,
    AnalyticsModule,
    DeliveryModule,
    CartModule,
    AdminModule,
    CategoryModule,
    CartModule,
    DeliveryModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }