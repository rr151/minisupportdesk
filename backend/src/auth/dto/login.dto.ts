// src/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mot de passe', minLength: 2 })
  @IsString()
  @MinLength(2)
  password: string;
}