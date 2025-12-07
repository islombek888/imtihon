import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { VariationController } from 'src/modules/variation/variation.controller';
import { VariationService } from 'src/modules/variation/variation.service';
import { CreateVariationDto } from 'src/modules/variation/dto/create-variation.dto';
import { UpdateVariationDto } from 'src/modules/variation/dto/update-variation.dto';


describe('VariationController', () => {
  let controller: VariationController;
  let service: VariationService;

  const mockVariationService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariationController],
      providers: [
        { provide: VariationService, useValue: mockVariationService },
      ],
    }).compile();

    controller = module.get<VariationController>(VariationController);
    service = module.get<VariationService>(VariationService);
  });


  it('should create a variation', async () => {
    const dto: CreateVariationDto = {
      productId: 'prod1',
      title: 'Size M',
      price: 100,
      stock: 10,
      sku: 'SKU001',
      images: ['img1.jpg'],
    };
    mockVariationService.create.mockResolvedValue(dto);

    expect(await controller.create(dto)).toEqual(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });


  it('should return all variations for a product', async () => {
    const variations = [{ productId: 'prod1', title: 'Size M' }];
    mockVariationService.findAll.mockResolvedValue(variations);

    expect(await controller.findAll('prod1')).toEqual(variations);
    expect(service.findAll).toHaveBeenCalledWith('prod1');
  });


  it('should return a single variation', async () => {
    const variation = { productId: 'prod1', title: 'Size M' };
    mockVariationService.findOne.mockResolvedValue(variation);

    expect(await controller.findOne('var1')).toEqual(variation);
    expect(service.findOne).toHaveBeenCalledWith('var1');
  });

  it('should throw NotFoundException if variation not found', async () => {
    mockVariationService.findOne.mockRejectedValue(new NotFoundException('Variation not found'));
    await expect(controller.findOne('invalidId')).rejects.toThrow(NotFoundException);
  });


  it('should update a variation', async () => {
    const dto: UpdateVariationDto = { price: 120 };
    const updated = { productId: 'prod1', title: 'Size M', price: 120 };
    mockVariationService.update.mockResolvedValue(updated);

    expect(await controller.update('var1', dto)).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith('var1', dto);
  });

  it('should throw NotFoundException if update fails', async () => {
    mockVariationService.update.mockRejectedValue(new NotFoundException('Variation not found'));
    await expect(controller.update('invalidId', {})).rejects.toThrow(NotFoundException);
  });


  it('should delete a variation', async () => {
    const deleted = { productId: 'prod1', title: 'Size M' };
    mockVariationService.delete.mockResolvedValue(deleted);

    expect(await controller.delete('var1')).toEqual(deleted);
    expect(service.delete).toHaveBeenCalledWith('var1');
  });
});
