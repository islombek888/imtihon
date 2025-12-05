import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from '../modules/upload/upload.service';
import { UploadController } from '../modules/upload/upload.controller';

describe('UploadModule', () => {
    let service: UploadService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UploadController],
            providers: [
                {
                    provide: UploadService,
                    useValue: {
                        uploadSingle: jest.fn().mockResolvedValue({
                            url: 'https://cdn.example.com/uploads/1.jpg',
                            fileName: '1.jpg',
                        }),

                        uploadMultiple: jest
                            .fn()
                            .mockResolvedValue([
                                {
                                    url: 'https://cdn.example.com/uploads/1.jpg',
                                    fileName: '1.jpg',
                                },
                                {
                                    url: 'https://cdn.example.com/uploads/2.jpg',
                                    fileName: '2.jpg',
                                },
                            ]),

                        deleteFile: jest.fn().mockResolvedValue({ deleted: true }),
                    },
                },
            ],
        }).compile();

        service = module.get<UploadService>(UploadService);
    });

    it('service bor bo‘lishi kerak', () => {
        expect(service).toBeDefined();
    });

    it('uploadSingle ishlashi kerak', async () => {
        const result = await service.uploadSingle({
            originalname: '1.jpg',
            buffer: Buffer.from('file1'),
        } as any);

        expect(result.url).toContain('cdn');
        expect(result.fileName).toBe('1.jpg');
    });

    it('uploadMultiple ishlashi kerak', async () => {
        const result = await service.uploadMultiple([
            { originalname: '1.jpg', buffer: Buffer.from('file1') } as any,
            { originalname: '2.jpg', buffer: Buffer.from('file2') } as any,
        ]);

        expect(result.length).toBe(2);
        expect(result[0].url).toContain('cdn');
        expect(result[1].url).toContain('cdn');
    });

    it('deleteFile ishlashi kerak', async () => {
        const result = await service.deleteFile('image1.jpg');
        expect(result.deleted).toBe(true);
    });
});
