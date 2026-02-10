import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { ActivityLogModule } from '../timeline/activity-log.module';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket,User]),
    ActivityLogModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [
    TypeOrmModule,
  ],
})
export class TicketModule {}