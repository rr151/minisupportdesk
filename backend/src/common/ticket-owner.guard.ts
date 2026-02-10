import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { TicketsService } from '../tickets/tickets.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class TicketOwnerGuard implements CanActivate {
  constructor(private ticketsService: TicketsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ticketId = request.params.id;

    if (user.role === UserRole.AGENT) return true;

    const ticket = await this.ticketsService.findById(ticketId);

    if (!ticket || ticket.createdBy.id !== user.userId) {
      throw new ForbiddenException('Accès interdit');
    }

    return true;
  }
}