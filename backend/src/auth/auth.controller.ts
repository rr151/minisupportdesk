import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // POST /auth/register
  @Post('register')
  @ApiOperation({ summary: 'Créer un compte utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  register(
    @Body() dto: RegisterDto,
  ) {
    return this.authService.register(dto);
  }

  // POST /auth/login
  @Post('login')
  @Throttle({default:{limit:5, ttl:60000} }) // max 5 tentatives par 60 secondes par IP
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiResponse({ status: 200, description: 'Connexion réussie, retourne le token JWT' })
  login(
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(dto);
  }
}