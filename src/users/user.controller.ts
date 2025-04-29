// src/users/user.controller.ts

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ Get semua user (hanya admin)
  @Get()
  @Roles('admin')
  findAll() {
    return this.userService.findAll();
  }

  // ✅ Get user berdasarkan ID (admin/user)
  @Get(':id')
  @Roles('admin', 'Beginner', 'Intermediate', 'Advanced')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
