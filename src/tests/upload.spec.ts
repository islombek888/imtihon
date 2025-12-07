import { Test, TestingModule } from '@nestjs/testing';
import { UploadController } from 'src/modules/upload/upload.controller';
import { UploadService } from 'src/modules/upload/upload.service';


describe('UploadController', () => {
  let controller: UploadController;
  let service: UploadService;

  const mockService = {
    uploadSingle: jest.fn(),
    uploadMultiple: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadController],
      providers: [
        { provide: UploadService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<UploadController>(UploadController);
    service = module.get<UploadService>(UploadService);
  });

  it('controller mavjud bo‘lishi kerak', () => {
    expect(controller).toBeDefined();
  });

  it('uploadSingle ishlashi kerak', async () => {
    const file = { originalname: 'test.png', buffer: Buffer.from('data') };
    const response = { url: 'https://cdn.example.com/uploads/test.png', fileName: 'test.png' };

    mockService.uploadSingle.mockResolvedValue(response);

    const result = await controller.uploadSingle(file as any);
    expect(result).toEqual(response);
    expect(service.uploadSingle).toHaveBeenCalledWith(file);
  });

  it('uploadMultiple ishlashi kerak', async () => {
    const files = [
      { originalname: 'a.png', buffer: Buffer.from('1') },
      { originalname: 'b.png', buffer: Buffer.from('2') },
    ];

    const response = [
      { url: 'https://cdn.example.com/uploads/a.png', fileName: 'a.png' },
      { url: 'https://cdn.example.com/uploads/b.png', fileName: 'b.png' },
    ];

    mockService.uploadMultiple.mockResolvedValue(response);

    const result = await controller.uploadMultiple(files as any);
    expect(result).toEqual(response);
    expect(service.uploadMultiple).toHaveBeenCalledWith(files);
  });
});