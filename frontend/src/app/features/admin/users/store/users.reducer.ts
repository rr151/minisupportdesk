import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { initialUsersState } from './users.state';
import { User } from '../../../../core/models/user.model';

const adapter = createEntityAdapter<User>();

export const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, { ...state, loading: false, error: null })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(UsersActions.upsertUser, (state, { user }) => adapter.upsertOne(user, state))
);

export const { selectAll } = adapter.getSelectors();
