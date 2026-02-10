import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
// import { TicketsService } from './tickets.service';
// import { TicketsController } from './tickets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [UsersService],
  exports: [
    TypeOrmModule,
    UsersService
    
  ],
})
export class UsersModule {}