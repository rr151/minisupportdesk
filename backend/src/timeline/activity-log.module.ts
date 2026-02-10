import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { ActivityLogService } from './activity-log.service';
// import { TicketsController } from './tickets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityLog]),
  ],
  controllers: [],
  providers: [ActivityLogService],
  exports: [
    TypeOrmModule,
    ActivityLogService
  ],
})
export class ActivityLogModule {}