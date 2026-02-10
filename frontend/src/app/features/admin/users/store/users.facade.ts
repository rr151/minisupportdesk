import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UsersActions from './users.actions';
import * as UsersSelectors from './users.selectors';
import { User } from '../../../../core/models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private readonly store = inject(Store);

  users$ = this.store.select(UsersSelectors.selectUsers);
  loading$ = this.store.select(UsersSelectors.selectUsersLoading);
  error$ = this.store.select(UsersSelectors.selectUsersError);

  load() {
    this.store.dispatch(UsersActions.loadUsers());
  }

  upsert(user: User) {
    this.store.dispatch(UsersActions.upsertUser({ user }));
  }
}
