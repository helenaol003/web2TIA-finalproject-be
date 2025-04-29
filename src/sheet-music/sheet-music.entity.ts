// src/sheet-music/sheet-music.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SheetMusic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @Column()
  grade: string;

  @Column()
  fileUrl: string; // path ke file PDF
}
