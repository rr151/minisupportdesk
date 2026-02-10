import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Ticket, TicketPriority, TicketStatus } from '../tickets/entities/ticket.entity';
import { ActivityLog, ActivityLogAction } from '../timeline/entities/activity-log.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private dataSource: DataSource,
  ) {}

  async run() {
    const userRepo: Repository<User> = this.dataSource.getRepository(User);
    const ticketRepo: Repository<Ticket> = this.dataSource.getRepository(Ticket);
    const logRepo: Repository<ActivityLog> = this.dataSource.getRepository(ActivityLog);

    // 1️⃣ Créer les users
    const usersData = [
      { email: 'agent@test.com', password: 'Test1234', role: 'agent' },
      { email: 'customer@test.com', password: 'Test1234', role: 'customer' },
    ];

    const users: Record<string, User> = {};
    for (const u of usersData) {
      let user = await userRepo.findOne({ where: { email: u.email } });
      if (!user) {
        user = userRepo.create({
          email: u.email,
          password: await bcrypt.hash(u.password, 10),
          role: UserRole.AGENT ==u.role ?UserRole.AGENT:UserRole.CUSTOMER,
        });
        await userRepo.save(user);
      }
      users[u.email] = user;
    }

    // 2️⃣ Créer les tickets
    const ticketsData = [
      {
        title: 'Problème de connexion à l’app',
        description: 'Impossible de se connecter à l’app depuis ce matin',
        status: TicketStatus.OPEN,
        priority: TicketPriority.MEDIUM,
        tags: ['login','urgent'],
        createdBy: users['customer@test.com'],
        assignedTo: users['agent@test.com'],
      },
      {
        title: 'Facture non reçue',
        description: 'Je n’ai pas reçu ma facture du mois dernier',
        status: TicketStatus.IN_PROGRESS,
        priority: TicketPriority.HIGH,
        tags: ['facture','payment'],
        createdBy: users['customer@test.com'],
        assignedTo: users['agent@test.com'],
      },
      {
        title: 'Suggestion nouvelle fonctionnalité',
        description: 'Je propose une nouvelle fonctionnalité pour l’application',
        status: TicketStatus.OPEN,
        priority: TicketPriority.LOW,
        tags: ['suggestion'],
        createdBy: users['customer@test.com'],
        assignedTo: null,
      },
      {
        title: 'Erreur sur paiement',
        description: 'Paiement bloqué lors du checkout',
        status: TicketStatus.RESOLVED,
        priority: TicketPriority.HIGH,
        tags: ['payment','bug'],
        createdBy: users['customer@test.com'],
        assignedTo: users['agent@test.com'],
      },
      {
        title: 'Question sur compte',
        description: 'Comment changer mon mot de passe ?',
        status: TicketStatus.OPEN,
        priority: TicketPriority.MEDIUM,
        tags: ['account','question'],
        createdBy: users['customer@test.com'],
        assignedTo: null,
      },
    ];

    const tickets: Ticket[] = [];
    for (const t of ticketsData) {
  const ticket = ticketRepo.create({
    title: t.title,
    description: t.description,
    status: t.status,
    priority: t.priority,
    tags: t.tags,
    createdBy: t.createdBy,
    assignedTo: t.assignedTo ?? undefined, // force le type User | null
  });

  await ticketRepo.save(ticket);

  // Activity log minimal
  const log = logRepo.create({
    ticket,
    action: ActivityLogAction.TICKET_CREATED,
    oldValue: {},
    newValue: { title: ticket.title, status: ticket.status, assignedTo: ticket.assignedTo?.id ?? null },
    user: t.createdBy,
  });
  await logRepo.save(log);
}

    console.log('✅ Seed users, tickets et activityLogs créés');
  }
}