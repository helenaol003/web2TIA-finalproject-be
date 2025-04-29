// src/score-requests/score-request.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateScoreRequestDto } from './create-score-request.dto';
import { ScoreRequestService } from './score-request.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Score Requests')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('score-requests')
export class ScoreRequestController {
  constructor(private readonly service: ScoreRequestService) {}

  @Post()
  @Roles('Beginner', 'Intermediate', 'Advanced', 'admin')
  @ApiOperation({ summary: 'Request partitur lagu baru' })
  @ApiResponse({ status: 201, description: 'Score request berhasil dibuat' })
  create(@Body() dto: CreateScoreRequestDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Lihat semua permintaan partitur (admin only)' })
  @ApiResponse({ status: 200, description: 'Daftar semua permintaan partitur' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter status score request' })
  findAll(@Query('status') status?: string) {
    return this.service.findAll(status);  // Filter berdasarkan status jika ada
  }

  @Patch(':id/status')
  @Roles('admin')
  @ApiOperation({ summary: 'Update status request partitur' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'Status berhasil diperbarui' })
  updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ) {
    return this.service.updateStatus(id, status);
  }
}
