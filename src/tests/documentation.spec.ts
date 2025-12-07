import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentationController } from 'src/modules/documentation/documentation.controller';
import { DocumentationService } from 'src/modules/documentation/documentation.service';


jest.mock('@nestjs/swagger', () => {
    return {
        DocumentBuilder: jest.fn().mockImplementation(() => ({
            setTitle: function () { return this; },
            setDescription: function () { return this; },
            setVersion: function () { return this; },
            addBearerAuth: function () { return this; },
            build: function () { return {}; },
        })),
        SwaggerModule: {
            createDocument: jest.fn().mockReturnValue({}),
            setup: jest.fn(),
        },
    };
});

jest.mock('redoc-express', () => {
    return () => jest.fn();
});

describe('Documentation Module Tests', () => {
    let controller: DocumentationController;
    let service: DocumentationService;
    let moduleRef: TestingModule;

    const mockApp: any = {
        use: jest.fn(),
        enableVersioning: jest.fn(),
    };

    beforeEach(async () => {
        moduleRef = await Test.createTestingModule({
            controllers: [DocumentationController],
            providers: [DocumentationService],
        }).compile();


        controller = moduleRef.get<DocumentationController>(DocumentationController);
        service = moduleRef.get<DocumentationService>(DocumentationService);


    });


    it('controller should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('controller.info() should return correct paths', () => {
        const result = controller.info();
        expect(result).toEqual({
            swagger: '/api-docs',
            swagger_json: '/api-docs/json',
            redoc: '/redoc',
        });
    });


    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('service.setupSwagger() should setup swagger and redoc', () => {
        const result = service.setupSwagger(mockApp);


        expect(result).toEqual({});
        expect(mockApp.use).toHaveBeenCalled();


    });

    it('service.setupVersioning() should enable versioning', () => {
        service.setupVersioning(mockApp);
        expect(mockApp.enableVersioning).toHaveBeenCalledWith({
            type: VersioningType.URI,
            defaultVersion: '1',
        });
    });


    it('module should compile', () => {
        expect(moduleRef).toBeDefined();
    });

    it('module should provide DocumentationService', () => {
        const svc = moduleRef.get<DocumentationService>(DocumentationService);
        expect(svc).toBeDefined();
    });

    it('module should register DocumentationController', () => {
        const ctrl = moduleRef.get<DocumentationController>(DocumentationController);
        expect(ctrl).toBeDefined();
    });
});
