// src/score-requests/score-request.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreRequest } from './score-request.entity';
import { ScoreRequestService } from './score-request.service';
import { ScoreRequestController } from './score-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreRequest])],
  providers: [ScoreRequestService],
  controllers: [ScoreRequestController],
})
export class ScoreRequestModule {}
