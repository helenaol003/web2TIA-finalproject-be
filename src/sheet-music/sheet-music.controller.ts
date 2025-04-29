// src/sheet-music/sheet-music.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SheetMusicService } from './sheet-music.service';
import { CreateSheetMusicDto } from './create-sheet-music.dto';

@Controller('sheet-music')
export class SheetMusicController {
  constructor(private readonly sheetService: SheetMusicService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Simpan di folder lokal
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.pdf$/)) {
          return cb(new Error('Only .pdf files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadSheet(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateSheetMusicDto,
  ) {
    const fileUrl = `/uploads/${file.filename}`; // kamu bisa ubah jadi URL publik kalau pakai Vercel + storage

    const created = await this.sheetService.create({
      ...body,
      fileUrl,
    });

    return {
      message: 'File uploaded successfully',
      data: created,
    };
  }

  @Get()
  findAll(@Query('grade') grade?: string) {
    if (grade) {
      return this.sheetService.findByGrade(grade);
    }
    return this.sheetService.findAll();
  }
}
