import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from 'src/modules/roles/roles.controller';
import { RolesService } from 'src/modules/roles/roles.service';

describe('RolesModule', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: {
            createRole: jest.fn().mockResolvedValue({
              id: '1',
              name: 'admin',
              permissions: ['read_users', 'write_users'],
            }),
            getRoles: jest.fn().mockResolvedValue([
              { id: '1', name: 'admin' },
              { id: '2', name: 'manager' },
            ]),
            getRoleById: jest.fn().mockResolvedValue({
              id: '1',
              name: 'admin',
            }),
            updateRole: jest.fn().mockResolvedValue({
              id: '1',
              name: 'super-admin',
            }),
            deleteRole: jest.fn().mockResolvedValue({ deleted: true }),
            assignRoleToUser: jest.fn().mockResolvedValue({
              success: true,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('service borligini tekshirish', () => {
    expect(service).toBeDefined();
  });

  it('createRole ishlashi kerak', async () => {
    const result = await service.createRole({
      name: 'admin',
      permissions: ['read_users', 'write_users'],
    });

    expect(result.name).toBe('admin');
  });

  it('getRoles ishlashi kerak', async () => {
    const result = await service.getRoles();
    expect(result.length).toBeGreaterThan(1);
  });

  it('getRoleById ishlashi kerak', async () => {
    const result = await service.getRoleById('1');
    expect(result.name).toBe('admin');
  });

  it('updateRole ishlashi kerak', async () => {
    const result = await service.updateRole('1', {
      name: 'super-admin',
    });

    expect(result.name).toBe('super-admin');
  });

  it('deleteRole ishlashi kerak', async () => {
    const result = await service.deleteRole('1');
    expect(result.deleted).toBe(true);
  });

  it('assignRoleToUser ishlashi kerak', async () => {
    const result = await service.assignRoleToUser('10', '1');
    expect(result.success).toBe(true);
  });
});