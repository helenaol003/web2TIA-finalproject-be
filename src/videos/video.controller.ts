// src/videos/video.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CreateVideoDto } from './create-video.dto';
import { VideoService } from './video.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Videos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Upload video (admin only)' })
  @ApiResponse({ status: 201, description: 'Video uploaded successfully' })
  create(@Body() dto: CreateVideoDto) {
    return this.videoService.create(dto);
  }

  @Get()
  @Roles('Beginner', 'Intermediate', 'Advanced', 'admin')
  @ApiOperation({ summary: 'Get videos based on user grade or all for admin' })
  @ApiResponse({ status: 200, description: 'List of videos returned' })
  @ApiQuery({ name: 'grade', required: false, description: 'Filter videos by grade' })
  findByUserGrade(@Req() req, @Query('grade') grade?: string) {
    const user = req.user;
    if (user.role === 'admin') {
      return this.videoService.findAll();
    }
    return this.videoService.findByGrade(grade || user.grade);
  }
}
