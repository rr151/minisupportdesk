import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as RolesActions from './roles.actions';
import { initialRolesState, RolesState } from './roles.state';
import { RoleEntity } from '../../../../core/models/role.model';

const adapter = createEntityAdapter<RoleEntity>();

export const rolesReducer = createReducer(
  initialRolesState,
  on(RolesActions.loadRoles, (state) => ({ ...state, loading: true, error: null })),
  on(RolesActions.loadRolesSuccess, (state, { roles }) =>
    adapter.setAll(roles, { ...state, loading: false, error: null })
  ),
  on(RolesActions.loadRolesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const { selectAll } = adapter.getSelectors();
