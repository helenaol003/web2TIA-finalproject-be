// src/config/data-source.ts
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { SheetMusic } from '../sheet-music/sheet-music.entity';
import { ScoreRequest } from '../score-requests/score-request.entity';
import { Video } from '../videos/video.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Gunakan dari .env
  ssl: { rejectUnauthorized: false }, // Neon butuh SSL
  entities: [User, SheetMusic, ScoreRequest, Video],
  synchronize: true, // hanya saat dev, jangan di production
});
