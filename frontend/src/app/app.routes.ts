import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ShellLayoutComponent } from './layout/shell/shell-layout.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { TicketsListComponent } from './features/tickets/pages/list/tickets-list.component';
import { TicketDetailComponent } from './features/tickets/pages/detail/ticket-detail.component';
import { TicketFormComponent } from './features/tickets/pages/form/ticket-form.component';
import { RolesComponent } from './features/admin/roles/pages/roles.component';
import { UsersComponent } from './features/admin/users/pages/users.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role.model';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '',
    component: ShellLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'tickets', component: TicketsListComponent },
      {
        path: 'tickets/new',
        component: TicketFormComponent,
        canActivate: [roleGuard],
        data: { roles: [Role.AGENT, Role.ADMIN] }
      },
      { path: 'tickets/:id', component: TicketDetailComponent },
      {
        path: 'tickets/:id/edit',
        component: TicketFormComponent,
        canActivate: [roleGuard],
        data: { roles: [Role.AGENT, Role.ADMIN] }
      },
      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: [Role.ADMIN] },
        children: [
          { path: 'roles', component: RolesComponent },
          { path: 'users', component: UsersComponent }
        ]
      }
    ]
  }
];
