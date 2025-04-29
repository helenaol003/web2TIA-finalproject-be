// src/users/profile.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export enum Grade {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(Grade, { message: 'Grade must be Beginner, Intermediate, or Advanced' })
  grade: Grade;
}
