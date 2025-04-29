// src/users/user.controller.ts
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Lihat semua pengguna (hanya admin)' })
  @ApiResponse({ status: 200, description: 'Daftar semua pengguna' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter status user' })
  findAll(@Query('status') status?: string) {
    return this.userService.findAll(status);  // Filter jika status ada
  }

  @Get(':id')
  @Roles('admin', 'Beginner', 'Intermediate', 'Advanced')
  @ApiOperation({ summary: 'Lihat detail pengguna berdasarkan ID' })
  @ApiParam({ name: 'id', type: 'string', example: '1' })
  @ApiResponse({ status: 200, description: 'Detail pengguna ditemukan' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
