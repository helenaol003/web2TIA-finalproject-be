// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/profile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const existing = await this.usersRepo.findOneBy({ email: dto.email });
    if (existing) throw new UnauthorizedException('Email already used');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ ...dto, password: hashed });
    await this.usersRepo.save(user);
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOneBy({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
      grade: user.grade,
    });

    return { token };
  }
}
