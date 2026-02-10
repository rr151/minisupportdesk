import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TicketsActions from './tickets.actions';
import * as TicketsSelectors from './tickets.selectors';
import { Ticket } from '../../../core/models/ticket.model';
import { TicketListParams } from '../../../core/services/ticket.service';

@Injectable({ providedIn: 'root' })
export class TicketsFacade {
  private readonly store = inject(Store);

  tickets$ = this.store.select(TicketsSelectors.selectTickets);
  loading$ = this.store.select(TicketsSelectors.selectTicketsLoading);
  error$ = this.store.select(TicketsSelectors.selectTicketsError);
  total$ = this.store.select(TicketsSelectors.selectTicketsTotal);
  page$ = this.store.select(TicketsSelectors.selectTicketsPage);
  limit$ = this.store.select(TicketsSelectors.selectTicketsLimit);

  load(params: TicketListParams) {
    this.store.dispatch(TicketsActions.loadTickets({ params }));
  }

  upsert(ticket: Ticket) {
    this.store.dispatch(TicketsActions.upsertTicket({ ticket }));
  }

  remove(id: string) {
    this.store.dispatch(TicketsActions.deleteTicket({ id }));
  }
}
