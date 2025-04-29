// src/auth/auth.controller.ts
import { Controller, Post, Body, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/profile.dto';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Query() query: LoginDTO) {
    const { email, password } = query;
    return this.authService.login(email, password);
  }
}
