import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
  }) {
    const user = this.usersRepository.create({
      ...data,
      role: data.role ?? UserRole.CUSTOMER,
    });

    return this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepository.createQueryBuilder('user')
    .addSelect('user.password') 
    .where('user.email = :email', { email })
    .getOne();
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }
}