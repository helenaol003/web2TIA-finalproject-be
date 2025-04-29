// src/videos/video.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  videoUrl: string;

  @Column()
grade: string;
}
