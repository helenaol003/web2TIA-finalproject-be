// src/videos/video.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto } from './create-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepo: Repository<Video>,
  ) {}

  create(dto: CreateVideoDto) {
    const video = this.videoRepo.create(dto);
    return this.videoRepo.save(video);
  }

  findAll() {
    return this.videoRepo.find();
  }

  findByGrade(grade: string) {
    return this.videoRepo.find({
      where: { grade },
    });
  }
}
