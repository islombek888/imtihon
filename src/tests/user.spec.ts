import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { ChangePasswordDto } from 'src/modules/user/dto/chane-password.dto';


describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    changePassword: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });


  it('should return all users', async () => {
    const users = [{ id: '1', name: 'John' }];
    mockUserService.findAll.mockResolvedValue(users);

    expect(await controller.findAll()).toEqual(users);
    expect(service.findAll).toHaveBeenCalled();
  });


  it('should return a single user', async () => {
    const user = { id: '1', name: 'John' };
    mockUserService.findOne.mockResolvedValue(user);

    expect(await controller.findOne('1')).toEqual(user);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if user not found', async () => {
    mockUserService.findOne.mockRejectedValue(new NotFoundException('User topilmadi'));
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  // ============================
  // UPDATE USER
  // ============================
  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'Jane' };
    const updatedUser = { id: '1', name: 'Jane' };

    mockUserService.update.mockResolvedValue(updatedUser);

    expect(await controller.update('1', dto)).toEqual(updatedUser);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should throw NotFoundException if update fails', async () => {
    mockUserService.update.mockRejectedValue(new NotFoundException('User topilmadi'));
    await expect(controller.update('999', {})).rejects.toThrow(NotFoundException);
  });


  it('should change user password', async () => {
    const dto: ChangePasswordDto = { oldPassword: 'old123', newPassword: 'new123' };
    const result = { message: 'Parol muvaffaqiyatli o‘zgartirildi' };

    mockUserService.changePassword.mockResolvedValue(result);

    expect(await controller.changePassword('1', dto)).toEqual(result);
    expect(service.changePassword).toHaveBeenCalledWith('1', dto);
  });

  it('should throw BadRequestException if old password is incorrect', async () => {
    mockUserService.changePassword.mockRejectedValue(new BadRequestException('Eski parol noto‘g‘ri'));
    await expect(controller.changePassword('1', { oldPassword: 'x', newPassword: 'y' })).rejects.toThrow(BadRequestException);
  });


  it('should delete a user', async () => {
    const result = { message: 'User o‘chirildi' };
    mockUserService.delete.mockResolvedValue(result);

    expect(await controller.delete('1')).toEqual(result);
    expect(service.delete).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if delete fails', async () => {
    mockUserService.delete.mockRejectedValue(new NotFoundException('User topilmadi'));
    await expect(controller.delete('999')).rejects.toThrow(NotFoundException);
  });
});
