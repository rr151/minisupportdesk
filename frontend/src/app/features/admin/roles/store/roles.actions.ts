import { createAction, props } from '@ngrx/store';
import { RoleEntity } from '../../../../core/models/role.model';

export const loadRoles = createAction('[Roles] Load');
export const loadRolesSuccess = createAction('[Roles] Load Success', props<{ roles: RoleEntity[] }>());
export const loadRolesFailure = createAction('[Roles] Load Failure', props<{ error: string }>());
