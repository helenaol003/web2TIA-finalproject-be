// src/videos/create-video.dto.ts
import { IsString, IsUrl, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({ example: 'Teknik Dasar Piano', description: 'Judul video' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Panduan teknik dasar bermain piano untuk pemula.', description: 'Deskripsi video' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://img.youtube.com/vi/abc123/default.jpg', description: 'URL thumbnail video' })
  @IsUrl()
  thumbnailUrl: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=abc123', description: 'URL video' })
  @IsUrl()
  videoUrl: string;

  @ApiProperty({ example: 'Beginner', enum: ['Beginner', 'Intermediate', 'Advanced'], description: 'Tingkat kesulitan video' })
  @IsIn(['Beginner', 'Intermediate', 'Advanced'])
  grade: string;
}
