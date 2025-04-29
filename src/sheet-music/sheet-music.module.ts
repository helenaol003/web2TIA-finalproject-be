// src/sheet-music/sheet-music.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetMusic } from './sheet-music.entity';
import { SheetMusicService } from './sheet-music.service';
import { SheetMusicController } from './sheet-music.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SheetMusic])],
  providers: [SheetMusicService],
  controllers: [SheetMusicController],
})
export class SheetMusicModule {}
