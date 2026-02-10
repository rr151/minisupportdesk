import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: '<div class="auth-shell"><router-outlet /></div>',
  styles: [
    '.auth-shell { min-height: 100vh; }'
  ]
})
export class AuthLayoutComponent {}
