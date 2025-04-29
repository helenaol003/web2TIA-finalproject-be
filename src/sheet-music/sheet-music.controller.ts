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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Sheet Music')
@Controller('sheet-music')
export class SheetMusicController {
  constructor(private readonly sheetService: SheetMusicService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload file sheet music (PDF)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Canon in D' },
        genre: { type: 'string', example: 'Klasik' },
        grade: {
          type: 'string',
          enum: ['Beginner', 'Intermediate', 'Advanced'],
          example: 'Intermediate',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
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
    const fileUrl = `/uploads/${file.filename}`;

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
  @ApiOperation({ summary: 'Lihat semua sheet music (opsional filter by grade)' })
  @ApiQuery({
    name: 'grade',
    required: false,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Filter berdasarkan tingkat',
  })
  findAll(@Query('grade') grade?: string) {
    if (grade) {
      return this.sheetService.findByGrade(grade);
    }
    return this.sheetService.findAll();
  }
}
