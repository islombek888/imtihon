import {Injectable,NotFoundException,BadRequestException,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/chane-password.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}


  async findAll() {
    return this.userModel.find().select('-password');
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User topilmadi');
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const updated = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password');

    if (!updated) throw new NotFoundException('User topilmadi');

    return updated;
  }

  async changePassword(id: string, dto: ChangePasswordDto) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User topilmadi');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Eski parol noto‘g‘ri');

    const hashed = await bcrypt.hash(dto.newPassword, 10);

    user.password = hashed;
    await user.save();

    return { message: 'Parol muvaffaqiyatli o‘zgartirildi' };
  }

  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('User topilmadi');
    return { message: 'User o‘chirildi' };
  }
}