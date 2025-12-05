
import { Injectable, VersioningType } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
const Redoc = require('redoc-express');

import { swaggerConfig } from 'src/config/swager.config';

@Injectable()
export class DocumentationService {
    setupSwagger(app: INestApplication) {
        const document = SwaggerModule.createDocument(app, swaggerConfig);

        SwaggerModule.setup('api-docs', app, document, {
            jsonDocumentUrl: '/api-docs/json',
            swaggerOptions: {
                persistAuthorization: true,
            },
        });

        
        app.use(
            '/redoc',
            Redoc({
                title: ' API Docs',
                specUrl: '/api-docs/json',
            }),
        );

        return document;
    }

    setupVersioning(app: INestApplication) {
        app.enableVersioning({
            type: VersioningType.URI,
            defaultVersion: '1',
        });
    };

}