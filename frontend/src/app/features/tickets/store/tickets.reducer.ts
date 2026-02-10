import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as TicketsActions from './tickets.actions';
import { initialTicketsState } from './tickets.state';
import { Ticket } from '../../../core/models/ticket.model';

const adapter = createEntityAdapter<Ticket>();

export const ticketsReducer = createReducer(
  initialTicketsState,
  on(TicketsActions.loadTickets, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TicketsActions.loadTicketsSuccess, (state, { response }) =>
    adapter.setAll(response.items, {
      ...state,
      loading: false,
      error: null,
      total: response.total,
      page: response.page,
      limit: response.limit
    })
  ),
  on(TicketsActions.loadTicketsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(TicketsActions.upsertTicket, (state, { ticket }) => adapter.upsertOne(ticket, state)),
  on(TicketsActions.deleteTicket, (state, { id }) => adapter.removeOne(id, state))
);

export const { selectAll, selectEntities } = adapter.getSelectors();
