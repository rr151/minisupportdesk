import { EntityState } from '@ngrx/entity';
import { RoleEntity } from '../../../../core/models/role.model';

export interface RolesState extends EntityState<RoleEntity> {
  loading: boolean;
  error: string | null;
}

export const initialRolesState: RolesState = {
  ids: [],
  entities: {},
  loading: false,
  error: null
};
