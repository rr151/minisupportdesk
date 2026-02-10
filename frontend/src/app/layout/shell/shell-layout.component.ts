import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: '<nav>Shell</nav><router-outlet />'
})
export class ShellLayoutComponent {}
