import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { Role } from '../../../core/models/role.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  user$ = this.store.select(AuthSelectors.selectUser);
  loading$ = this.store.select(AuthSelectors.selectAuthLoading);
  error$ = this.store.select(AuthSelectors.selectAuthError);

  login(email: string, password: string) {
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  register(email: string, password: string, role: Role) {
    this.store.dispatch(AuthActions.register({ email, password, role }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
