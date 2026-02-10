import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog, ActivityLogAction } from './entities/activity-log.entity';
import { Ticket, TicketPriority } from '../tickets/entities/ticket.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private activityLogRepository: Repository<ActivityLog>,
    ) { }

    async create(data: {
    log: Ticket;
    action: ActivityLogAction;
    oldValue: any;
    newValue: any;
    user: User;
}) {
    const activityLog = await this.activityLogRepository.insert({
        ticket: { id: data.log.id } as Ticket, 
        action: data.action,
        oldValue: data.oldValue,
        newValue: data.newValue,
        user: { id: data.user.id } as User
    });
    return this.activityLogRepository.findOne({ 
        where: { id: activityLog.identifiers[0].id } 
    });
}
}