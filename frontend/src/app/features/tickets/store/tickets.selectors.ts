import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from './tickets.reducer';
import { TicketsState } from './tickets.state';

export const selectTicketsState = createFeatureSelector<TicketsState>('tickets');

export const selectTickets = createSelector(selectTicketsState, selectAll);
export const selectTicketsLoading = createSelector(selectTicketsState, (state) => state.loading);
export const selectTicketsError = createSelector(selectTicketsState, (state) => state.error);
export const selectTicketsTotal = createSelector(selectTicketsState, (state) => state.total);
export const selectTicketsPage = createSelector(selectTicketsState, (state) => state.page);
export const selectTicketsLimit = createSelector(selectTicketsState, (state) => state.limit);
