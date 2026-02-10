// src/timeline/entities/activity-log.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

export enum ActivityLogAction {
  TICKET_CREATED = 'ticket_created',
  TICKET_UPDATED = 'ticket_updated',
  STATUS_CHANGED = 'status_changed',
  ASSIGNED       = 'assigned',
  COMMENT_ADDED  = 'comment_added',
  TICKET_DELETED = "TICKET_DELETED",
}
@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum',enum:ActivityLogAction})
  action: ActivityLogAction

  @Column({ type: 'json', nullable: true })
  oldValue: any;

  @Column({ type: 'json', nullable: true })
  newValue: any;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Ticket, (ticket) => ticket.activities, { onDelete: 'CASCADE' })
  ticket: Ticket;

  @ManyToOne(() => User)
  user: User; // L'auteur de l'action
}