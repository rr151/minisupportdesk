import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { authReducer } from './features/auth/store/auth.reducer';
import { ticketsReducer } from './features/tickets/store/tickets.reducer';
import { rolesReducer } from './features/admin/roles/store/roles.reducer';
import { usersReducer } from './features/admin/users/store/users.reducer';
import { AuthEffects } from './features/auth/store/auth.effects';
import { TicketsEffects } from './features/tickets/store/tickets.effects';
import { RolesEffects } from './features/admin/roles/store/roles.effects';
import { UsersEffects } from './features/admin/users/store/users.effects';
import { AppEffects } from './core/store/app.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideStore({
      auth: authReducer,
      tickets: ticketsReducer,
      roles: rolesReducer,
      users: usersReducer
    }),
    provideEffects([AppEffects, AuthEffects, TicketsEffects, RolesEffects, UsersEffects]),
    provideStoreDevtools({ name: 'ticket', maxAge: 25 })
  ]
};
