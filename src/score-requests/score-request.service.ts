// src/score-requests/score-request.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreRequest } from './score-request.entity';
import { Repository } from 'typeorm';
import { CreateScoreRequestDto } from './create-score-request.dto';

@Injectable()
export class ScoreRequestService {
  constructor(
    @InjectRepository(ScoreRequest)
    private readonly repo: Repository<ScoreRequest>,
  ) {}

  create(dto: CreateScoreRequestDto) {
    const request = this.repo.create(dto);
    return this.repo.save(request);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async updateStatus(id: number, status: string) {
    await this.repo.update(id, { status });
    return this.repo.findOne({ where: { id } });
  }
}
