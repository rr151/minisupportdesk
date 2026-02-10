import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data :{
    email: string,
    password: string,
    name: string
  }) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Email déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.create({
      email:data.email,
      password: hashedPassword,
      name: data.name,
    });

    return this.generateToken(user);
  }

  async login(data:{
    email: string,
    password: string,
  }) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    return this.generateToken(user);
  }

  
  private generateToken(user: any) {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}