// src/videos/video.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateVideoDto } from './create-video.dto';
import { VideoService } from './video.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @Roles('admin')
  async create(@Body() dto: CreateVideoDto) {
    return this.videoService.create(dto);
  }

  // 🟡 b. Get videos sesuai grade user
  @Get()
@Roles('Beginner', 'Intermediate', 'Advanced', 'admin')
async findByUserGrade(@Req() req) {
  const user = req.user;

  if (user.role === 'admin') {
    return this.videoService.findAll(); // admin bisa lihat semua
  }

  return this.videoService.findByGrade(user.grade); // user biasa lihat sesuai grade
}
}
