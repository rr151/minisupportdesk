import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Role } from '../../../core/models/role.model';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.auth.login(email, password).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              user: response.user,
              accessToken: response.access_token,
              refreshToken: response.refresh_token
            })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: this.extractMessage(error) }))
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ email, password, role }) =>
        this.auth.register(email, password, role).pipe(
          map((response) =>
            AuthActions.registerSuccess({
              user: {
                id: response.id,
                email: response.email,
                role: role as Role,
                permissions: []
              }
            })
          ),
          catchError((error) =>
            of(AuthActions.registerFailure({ error: this.extractMessage(error) }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user, accessToken, refreshToken }) => {
          localStorage.setItem('auth.user', JSON.stringify(user));
          localStorage.setItem('auth.accessToken', accessToken);
          localStorage.setItem('auth.refreshToken', refreshToken);
          this.toast.success('Connexion reussie');
          void this.router.navigate(['/tickets']);
        })
      ),
    { dispatch: false }
  );

  private extractMessage(error: unknown): string {
    const httpError = error as { error?: { message?: string } };
    return httpError?.error?.message ?? 'Unexpected error';
  }
}
