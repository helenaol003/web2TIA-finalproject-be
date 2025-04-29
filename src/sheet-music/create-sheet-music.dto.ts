// src/sheet-music/create-sheet-music.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class CreateSheetMusicDto {
  @ApiProperty({ example: 'Canon in D', description: 'Judul partitur musik' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Klasik', description: 'Genre musik' })
  @IsString()
  genre: string;

  @ApiProperty({
    example: 'Intermediate',
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    description: 'Tingkat kesulitan partitur',
  })
  @IsIn(['Beginner', 'Intermediate', 'Advanced'])
  grade: 'Beginner' | 'Intermediate' | 'Advanced';

  @ApiProperty({
    example: '/uploads/canon-in-d.pdf',
    description: 'Path file PDF hasil upload (otomatis saat upload)',
  })
  @IsString()
  fileUrl: string;
}
