import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { AddressController } from 'src/modules/address/address.controller';
import { AddressService } from 'src/modules/address/address.service';

describe('Address Module Tests', () => {
  let controller: AddressController;
  let service: AddressService;
  let model: any;

  const mockAddress = {
    _id: 'addressId123',
    userId: 'user123',
    fullName: 'Test User',
    phoneNumber: '123456',
    region: 'Tashkent',
    district: 'Olmazor',
    street: 'Test street',
    home: '10',
    additionalInfo: 'Info',
    isDefault: false,
    save: jest.fn().mockResolvedValue(true),
  };

  const mockModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn(),
    updateMany: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        AddressService,
        {
          provide: getModelToken('Address'),
          useValue: mockModel,
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get<AddressService>(AddressService);
    model = module.get(getModelToken('Address'));
  });

  // -------------------------------
  // SERVICE TESTS
  // -------------------------------

  it('create - should create new address', async () => {
    const dto = { ...mockAddress };

    mockModel.create.mockResolvedValue(mockAddress);
    mockModel.updateMany.mockResolvedValue(null);

    const result = await service.create(dto);

    expect(mockModel.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockAddress);
  });

  it('findUserAddresses - should return list', async () => {
    mockModel.sort.mockResolvedValue([mockAddress]);
    mockModel.find.mockReturnValue({ sort: mockModel.sort });

    const result = await service.findUserAddresses('user123');

    expect(result).toEqual([mockAddress]);
  });

  it('setDefault - should set default address', async () => {
    mockModel.findOne.mockResolvedValue(mockAddress);
    mockModel.updateMany.mockResolvedValue(null);

    const result = await service.setDefault('user123', 'addressId123');

    expect(result.isDefault).toBe(true);
    expect(mockModel.updateMany).toHaveBeenCalled();
  });

  it('setDefault - should throw NotFoundException', async () => {
    mockModel.findOne.mockResolvedValue(null);

    await expect(
      service.setDefault('user123', 'wrongId'),
    ).rejects.toThrow(NotFoundException);
  });

  it('update - should update address', async () => {
    mockModel.findById.mockResolvedValue(mockAddress);
    mockModel.findByIdAndUpdate.mockResolvedValue({
      ...mockAddress,
      fullName: 'Updated',
    });

    const result = await service.update('addressId123', { fullName: 'Updated' });

    expect((result as any).fullName).toBe('Updated');

  });

  it('update - throw if not found', async () => {
    mockModel.findById.mockResolvedValue(null);

    await expect(
      service.update('wrongId', { fullName: 'Test' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('delete - should delete address', async () => {
    mockModel.findByIdAndDelete.mockResolvedValue(mockAddress);

    const result = await service.delete('addressId123');

    expect(result).toEqual({ message: 'Manzil o‘chirildi' });
  });

  it('delete - throw if not found', async () => {
    mockModel.findByIdAndDelete.mockResolvedValue(null);

    await expect(service.delete('wrongId')).rejects.toThrow(NotFoundException);
  });


  it('createAddress - controller', async () => {
    mockModel.create.mockResolvedValue(mockAddress);

    const result = await controller.createAddress(mockAddress);

    expect(result).toEqual(mockAddress);
  });

  it('getUserAddresses - controller', async () => {
    mockModel.sort.mockResolvedValue([mockAddress]);
    mockModel.find.mockReturnValue({ sort: mockModel.sort });

    const result = await controller.getUserAddresses('user123');

    expect(result).toEqual([mockAddress]);
  });

  it('setDefault - controller', async () => {
    mockModel.findOne.mockResolvedValue(mockAddress);

    const result = await controller.setDefault('user123', 'addressId123');

    expect(result).toEqual(mockAddress);
  });

  it('update - controller', async () => {
    mockModel.findById.mockResolvedValue(mockAddress);
    mockModel.findByIdAndUpdate.mockResolvedValue({
      ...mockAddress,
      fullName: 'Updated',
    });

    const result = await controller.update('addressId123', {
      fullName: 'Updated',
    });

    expect((result as any).fullName).toBe('Updated');

  });

  it('delete - controller', async () => {
    mockModel.findByIdAndDelete.mockResolvedValue(mockAddress);

    const result = await controller.delete('addressId123');

    expect(result).toEqual({ message: 'Manzil o‘chirildi' });
  });
});
