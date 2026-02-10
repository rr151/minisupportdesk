import { EntityState } from '@ngrx/entity';
import { User } from '../../../../core/models/user.model';

export interface UsersState extends EntityState<User> {
  loading: boolean;
  error: string | null;
}

export const initialUsersState: UsersState = {
  ids: [],
  entities: {},
  loading: false,
  error: null
};
