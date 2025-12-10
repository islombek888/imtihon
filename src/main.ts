import { ValidationPipe } from '@nestjs/common';
import { NestFactory,  } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { DocumentationService } from './modules/documentation/documentation.service';
import { HttpExceptionFilter } from './common/filters/http-exeption.filter';


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
  app.useGlobalFilters(new HttpExceptionFilter()); 


  const documentationService = app.get(DocumentationService);


  documentationService.setupSwagger(app);

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);

  console.log(`Server running: http://localhost:${PORT}`);
  console.log(`Swagger UI:    http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON:  http://localhost:${PORT}/api-docs/json`);
} 
bootstrap();   
 