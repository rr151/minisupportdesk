import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { ActivityLogModule } from './timeline/activity-log.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres', // 'postgres' dans Docker, 'localhost' en local
      port: parseInt(process.env.DB_PORT || '5432', 10) ,
      username: process.env.POSTGRES_USER || 'user',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'support_desk',
      autoLoadEntities: true, 
      synchronize: true,
      // logging: true, 
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5, // max 5 requêtes par IP par minute
      }
    ]),
    TicketModule,
    UsersModule,
    ActivityLogModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
