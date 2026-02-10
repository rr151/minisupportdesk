import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from './users.reducer';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(selectUsersState, selectAll);
export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);
export const selectUsersError = createSelector(selectUsersState, (state) => state.error);
