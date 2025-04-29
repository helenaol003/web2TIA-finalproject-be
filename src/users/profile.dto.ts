// src/users/profile.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Grade {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export class CreateUserDto {
  @ApiProperty({ example: 'Helena', description: 'Nama lengkap pengguna' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'helena@example.com', description: 'Email pengguna' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'securePassword123', minLength: 6, description: 'Kata sandi (min. 6 karakter)' })
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Grade, example: Grade.Beginner, description: 'Tingkat kemampuan musik pengguna' })
  @IsEnum(Grade, { message: 'Grade must be Beginner, Intermediate, or Advanced' })
  grade: Grade;
}
