// src/score-requests/create-score-request.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateScoreRequestDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  composer?: string;

  @IsUrl()
  referenceLink: string;

  @IsString()
  message: string;
}
