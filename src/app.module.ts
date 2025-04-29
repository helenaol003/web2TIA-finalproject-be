// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { SheetMusicModule } from './sheet-music/sheet-music.module';
import { VideoModule } from './videos/video.module';
import { ScoreRequestModule } from './score-requests/score-request.service.module';

import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      }
    }),
    AuthModule,
    UserModule,
    SheetMusicModule,
    VideoModule,
    ScoreRequestModule,
  ],
})
export class AppModule {}