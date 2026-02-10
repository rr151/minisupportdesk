// src/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mot de passe', minLength: 2, maxLength: 50 })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  password: string;

  @ApiProperty({ description: 'Nom complet de l\'utilisateur' })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}