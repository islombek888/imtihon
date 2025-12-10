import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => req.cookies['refresh-token'], // cookie nomi mos bo‘lishi kerak
      secretOrKey: process.env.JWT_REFRESH_SECRET as string,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const token = req.cookies['refresh-token'];
    if (!token) throw new UnauthorizedException('Refresh token missing');
    return payload; 
  }
}
 