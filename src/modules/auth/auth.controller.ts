import {Controller,Post,Body,Res,Get,UseGuards,Req,UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import express from 'express';

interface JwtRequest extends express.Request {
  user: { sub: string; email: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.register(dto, res);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.login(dto, res);
  }  

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @Req() req: JwtRequest,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return this.authService.refresh(req.user, res);
  } 

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logout(@Req() req: JwtRequest) {
    const userId = req.user?.sub; 
    if (!userId) throw new UnauthorizedException('User not found');

    return this.authService.logout(userId);
  }
}