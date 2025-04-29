// src/videos/create-video.dto.ts
import { IsString, IsUrl, IsIn } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnailUrl: string;

  @IsUrl()
  videoUrl: string;

  @IsIn(['Beginner', 'Intermediate', 'Advanced'])
  grade: string;
}
