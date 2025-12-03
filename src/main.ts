import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { AllExceptionsFilter } from './common/filters/all-exeptions.filter';
import { RolesGuard } from './modules/roles/guards/roles.guard';

dotenvConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });


  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });
  app.use(cookieParser());


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalFilters(new AllExceptionsFilter());


  const apiPrefix = process.env.API_PREFIX || 'api';
  app.setGlobalPrefix(apiPrefix);


  const port = process.env.PORT || 3000;


  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Ecommerce API')
      .setDescription('Uzum-like ecommerce backend')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'access-token',
      )
      .addCookieAuth('refresh-token')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

    console.log(
      `Swagger running on http://localhost:${port}/${apiPrefix}/docs`,
    );
  }

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}/${apiPrefix}`);
}

bootstrap();
