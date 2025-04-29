// src/sheet-music/sheet-music.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SheetMusic } from './sheet-music.entity';
import { CreateSheetMusicDto } from './create-sheet-music.dto';

@Injectable()
export class SheetMusicService {
  constructor(
    @InjectRepository(SheetMusic)
    private sheetRepo: Repository<SheetMusic>,
  ) {}

  create(data: CreateSheetMusicDto) {
    const sheet = this.sheetRepo.create(data);
    return this.sheetRepo.save(sheet);
  }

  findAll() {
    return this.sheetRepo.find();
  }

  findOne(id: number) {
    return this.sheetRepo.findOneBy({ id });
  }

  findByGrade(grade: string) {
    return this.sheetRepo.find({
      where: { grade },
    });
  }
}
