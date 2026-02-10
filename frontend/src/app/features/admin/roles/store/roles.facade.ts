import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RolesActions from './roles.actions';
import * as RolesSelectors from './roles.selectors';

@Injectable({ providedIn: 'root' })
export class RolesFacade {
  private readonly store = inject(Store);

  roles$ = this.store.select(RolesSelectors.selectRoles);
  loading$ = this.store.select(RolesSelectors.selectRolesLoading);
  error$ = this.store.select(RolesSelectors.selectRolesError);

  load() {
    this.store.dispatch(RolesActions.loadRoles());
  }
}
