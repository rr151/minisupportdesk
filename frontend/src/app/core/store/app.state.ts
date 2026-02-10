import { AuthState } from '../../features/auth/store/auth.state';
import { TicketsState } from '../../features/tickets/store/tickets.state';
import { RolesState } from '../../features/admin/roles/store/roles.state';
import { UsersState } from '../../features/admin/users/store/users.state';

export interface AppState {
  auth: AuthState;
  tickets: TicketsState;
  roles: RolesState;
  users: UsersState;
}
