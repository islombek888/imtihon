import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { RolesGuard } from './modules/roles/guards/roles.guard';
import { AllExceptionsFilter } from './common/filters/all-exeptions.filter';
import { DocumentationService } from './modules/documentation/documentation.service';


dotenvConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalFilters(new AllExceptionsFilter());

  const documentationService = app.get(DocumentationService);

 
  documentationService.setupVersioning(app);


  documentationService.setupSwagger(app);

  const apiPrefix = process.env.API_PREFIX || 'api';
  app.setGlobalPrefix(apiPrefix);

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);

  console.log(`Server running: http://localhost:${PORT}`);
  console.log(`Swagger UI:    http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON:  http://localhost:${PORT}/api-docs/json`);
}
bootstrap();
