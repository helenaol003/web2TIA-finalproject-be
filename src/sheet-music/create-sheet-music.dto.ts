// src/sheet-music/create-sheet-music.dto.ts
export class CreateSheetMusicDto {
  title: string;
  genre: string;
  grade: 'Beginner' | 'Intermediate' | 'Advanced';
  fileUrl: string; // sementara manual, nanti diganti dari upload
}
