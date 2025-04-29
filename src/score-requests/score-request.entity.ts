// src/score-requests/score-request.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ScoreRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  composer?: string;

  @Column()
  referenceLink: string;

  @Column()
  message: string;

  @Column({ default: 'Menunggu' }) // Tambahkan ini
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
