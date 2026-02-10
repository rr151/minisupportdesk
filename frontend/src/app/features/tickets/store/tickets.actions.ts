import { createAction, props } from '@ngrx/store';
import { Ticket } from '../../../core/models/ticket.model';
import { TicketListParams, TicketListResponse } from '../../../core/services/ticket.service';

export const loadTickets = createAction(
  '[Tickets] Load',
  props<{ params: TicketListParams }>()
);
export const loadTicketsSuccess = createAction(
  '[Tickets] Load Success',
  props<{ response: TicketListResponse }>()
);
export const loadTicketsFailure = createAction('[Tickets] Load Failure', props<{ error: string }>());

export const upsertTicket = createAction('[Tickets] Upsert', props<{ ticket: Ticket }>());
export const deleteTicket = createAction('[Tickets] Delete', props<{ id: string }>());
