// src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { User } from '../users/entities/user.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { ActivityLog } from '../timeline/entities/activity-log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres', // 'postgres' dans Docker, 'localhost' en local
      port: parseInt(process.env.DB_PORT || '5432', 10) ,
      username: process.env.POSTGRES_USER || 'user',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'support_desk',
      entities: [User, Ticket, ActivityLog],
      synchronize: true, 
      logging: true, 
    }),
    TypeOrmModule.forFeature([User, Ticket, ActivityLog]),
  ],
  providers: [SeedService],
})
export class SeedModule {}