// src/score-requests/create-score-request.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateScoreRequestDto {
  @ApiProperty({ example: 'River Flows in You', description: 'Judul lagu yang diminta' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Yiruma', description: 'Nama komposer (opsional)' })
  @IsOptional()
  @IsString()
  composer?: string;

  @ApiProperty({ example: 'https://youtube.com/watch?v=abc123', description: 'Link referensi lagu' })
  @IsUrl()
  referenceLink: string;

  @ApiProperty({ example: 'Tolong buatkan partitur piano solo.', description: 'Pesan tambahan dari user' })
  @IsString()
  message: string;
}
