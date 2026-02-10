import { createAction, props } from '@ngrx/store';
import { User } from '../../../../core/models/user.model';

export const loadUsers = createAction('[Users] Load');
export const loadUsersSuccess = createAction('[Users] Load Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Failure', props<{ error: string }>());

export const upsertUser = createAction('[Users] Upsert', props<{ user: User }>());
