import { EntityState } from '@ngrx/entity';
import { Ticket } from '../../../core/models/ticket.model';

export interface TicketsState extends EntityState<Ticket> {
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

export const initialTicketsState: TicketsState = {
  ids: [],
  entities: {},
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10
};
