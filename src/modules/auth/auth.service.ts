import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
  ) { }


  async register(dto: RegisterDto, res: Response) {
    const exist = await this.userModel.findOne({ email: dto.email });
    if (exist) throw new BadRequestException('Email already exists');

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      fullName: dto.fullName,
      email: dto.email,
      password: hash,
    });

    return this.generateTokens(user, res);
  }


  async login(dto: LoginDto, res: Response) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    return this.generateTokens(user, res);
  }

  async generateTokens(user: UserDocument, res: Response) {
    const payload = { sub: user._id, email: user.email };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d'
    });


    res.cookie('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Success',
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    };
  }


  async refresh(user: any, res: Response) {
    const fullUser = await this.userModel.findById(user.sub);
    if (!fullUser) {
      throw new Error('User not found');
    }
    return this.generateTokens(fullUser, res);
  }

  async logout(res: Response) {
    res.clearCookie('refresh-token');
    return { message: 'Logged out' };
  }
}