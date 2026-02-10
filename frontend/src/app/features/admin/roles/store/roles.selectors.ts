import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll } from './roles.reducer';
import { RolesState } from './roles.state';

export const selectRolesState = createFeatureSelector<RolesState>('roles');

export const selectRoles = createSelector(selectRolesState, selectAll);
export const selectRolesLoading = createSelector(selectRolesState, (state) => state.loading);
export const selectRolesError = createSelector(selectRolesState, (state) => state.error);
