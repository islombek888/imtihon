import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from 'src/modules/roles/roles.controller';
import { RolesService } from 'src/modules/roles/roles.service';


describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  const mockService = {
    createRole: jest.fn(),
    getRoles: jest.fn(),
    assignRole: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        { provide: RolesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    service = module.get<RolesService>(RolesService);
  });

  it('controller mavjud bo‘lishi kerak', () => {
    expect(controller).toBeDefined();
  });

  it('createRole ishlashi kerak', async () => {
    const dto = { name: 'admin', permissions: ['manage_users'] };
    mockService.createRole.mockResolvedValue(dto);

    const result = await controller.createRole(dto);
    expect(result).toEqual(dto);
    expect(service.createRole).toHaveBeenCalledWith(dto);
  });

  it('getRoles ishlashi kerak', async () => {
    const roles = [{ name: 'user' }];
    mockService.getRoles.mockResolvedValue(roles);

    const result = await controller.getRoles();
    expect(result).toEqual(roles);
    expect(service.getRoles).toHaveBeenCalled();
  });

  it('assignRole ishlashi kerak', async () => {
    const dto = { userId: '1', role: 'admin' };
    const updatedUser = { id: '1', role: 'admin' };
    mockService.assignRole.mockResolvedValue(updatedUser);

    const result = await controller.assignRole(dto);
    expect(result).toEqual(updatedUser);
    expect(service.assignRole).toHaveBeenCalledWith(dto);
  });
});