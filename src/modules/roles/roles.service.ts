import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { User } from '../user/user.schema';


@Injectable()
export class RolesService {
  [x: string]: any;
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(User.name) private userModel: Model<any>,
  ) {}

  createRole(dto: CreateRoleDto) {
    return this.roleModel.create(dto);
  }

  getRoles() {
    return this.roleModel.find();
  }

  async assignRole(dto: AssignRoleDto) {
    return this.userModel.findByIdAndUpdate(
      dto.userId,
      { role: dto.role },
      { new: true },
    );
  }
}