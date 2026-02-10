import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketPriority, TicketStatus } from './entities/ticket.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { ActivityLogService } from '../timeline/activity-log.service';
import { ActivityLogAction } from '../timeline/entities/activity-log.entity';
import { TicketQueryDto } from './dto/query-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    private activityLogService: ActivityLogService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(data: {
    title: string;
    description: string;
    priority?: TicketPriority;
    tags?: string[];
  }, user: User) {
    if (!user || !user.id) {
      throw new Error('User ID is required');
    }
    const ticket = this.ticketsRepository.create({
      title: data.title,
      description: data.description,
      priority: data.priority ?? TicketPriority.MEDIUM,
      tags: data.tags ?? [],
      status: TicketStatus.OPEN,
      createdBy: user,
    });

    const savedTicket = await this.ticketsRepository.save(ticket);

    // Timeline
    await this.activityLogService.create({
      log: savedTicket,
      action: ActivityLogAction.TICKET_CREATED,
      oldValue: null,
      newValue: {

        title: savedTicket.title,
        priority: savedTicket.priority,
      },
      user: user,
    });

    return savedTicket;
  }

  async findById(id: string) {
    return this.ticketsRepository.findOne({
      where: { id },
    });
  }

  async findAll(user: User, query: TicketQueryDto) {
    const { page = 1,
      limit = 10,
      status,
      priority,
      tags,
      assignedTo,
      search,
    } = query;

    const qb = this.ticketsRepository.createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.createdBy', 'createdBy')
      .leftJoinAndSelect('ticket.assignedTo', 'assignedTo')
      .innerJoinAndSelect('ticket.activities', 'activityLog')
      .orderBy('ticket.updatedAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    // customer → seulement ses tickets
    if (user.role === 'customer') {
      qb.andWhere('createdBy.id = :userId', { userId: user.id });
    }

    if (status?.length) {
      qb.andWhere('ticket.status IN (:...status)', { status });
    }

    if (priority?.length) {
      qb.andWhere('ticket.priority IN (:...priority)', { priority });
    }

    if (tags?.length) {
      tags.forEach((tag, index) => {
        qb.andWhere(`ticket.tags ILIKE :tag${index}`, {
          [`tag${index}`]: `%${tag}%`,
        });
      });
    }

    if (assignedTo) {
      qb.andWhere('assignedTo.id = :assignedTo', { assignedTo });
    }

    if (search) {
      qb.andWhere(
        '(ticket.title ILIKE :search OR ticket.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(
  ticketId: string,
  data: UpdateTicketDto,
  user: User,
) {
  const ticket = await this.ticketsRepository.findOne({
    where: { id: ticketId },
    relations: ['assignedTo'],
  });

  if (!ticket) {
    throw new NotFoundException('Ticket introuvable');
  }

  const oldValue: any = {};
  const newValue: any = {};

  // statut
  if (data.status && data.status !== ticket.status) {
    oldValue.status = ticket.status;
    newValue.status = data.status;
    ticket.status = data.status;
  }

  // assignation
  if (data.assignedToId) {
    const newAssignee = await this.usersRepository.findOne({
      where: { id: data.assignedToId },
    });

    if (!newAssignee) {
      throw new NotFoundException('Utilisateur assigné introuvable');
    }

    oldValue.assignedTo = ticket.assignedTo?.id ?? null;
    newValue.assignedTo = newAssignee.id;
    ticket.assignedTo = newAssignee;
  }

  // on ne change rien
  if (Object.keys(newValue).length === 0) {
    return ticket;
  }

  const savedTicket = await this.ticketsRepository.save(ticket);

  await this.activityLogService.create({
    log: savedTicket,
    action: ActivityLogAction.TICKET_UPDATED,
    oldValue,
    newValue,
    user,
  });

  return savedTicket;
}
  async remove(ticketId: string, user: User) {
  const ticket = await this.ticketsRepository.findOne({
    where: { id: ticketId },
  });

  if (!ticket) {
    throw new NotFoundException('Ticket introuvable');
  }

  // Log AVANT suppression
  await this.activityLogService.create({
    log: ticket,
    action: ActivityLogAction.TICKET_DELETED,
    oldValue: {
      title: ticket.title,
      status: ticket.status,
      assignedTo: ticket.assignedTo?.id ?? null,
    },
    newValue: null,
    user,
  });

  // Suppression définitive
  await this.ticketsRepository.remove(ticket);

  return {
    message: 'Ticket supprimé définitivement',
  };
}

}