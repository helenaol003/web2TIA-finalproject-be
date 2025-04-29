// src/score-requests/score-request.controller.ts
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    UseGuards,
  } from '@nestjs/common';
  import { CreateScoreRequestDto } from './create-score-request.dto';
  import { ScoreRequestService } from './score-request.service';
  import { AuthGuard } from '@nestjs/passport';
  import { RolesGuard } from '../auth/roles.guard';
  import { Roles } from '../auth/roles.decorator';
  
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Controller('score-requests')
  export class ScoreRequestController {
    constructor(private readonly service: ScoreRequestService) {}
  
    @Post()
    @Roles('Beginner', 'Intermediate', 'Advanced', 'admin')
    create(@Body() dto: CreateScoreRequestDto) {
      return this.service.create(dto);
    }
  
    @Get()
    @Roles('admin')
    findAll() {
      return this.service.findAll();
    }
  
    @Patch(':id/status')
    @Roles('admin')
    updateStatus(
      @Param('id') id: number,
      @Body('status') status: string,
    ) {
      return this.service.updateStatus(id, status);
    }
  }
  