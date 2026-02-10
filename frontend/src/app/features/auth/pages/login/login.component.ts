import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../store/auth.facade';
import { ToastComponent } from '../../../../shared/ui/toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitting = signal(false);

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthFacade);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submit() {
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    const { email, password } = this.form.getRawValue();
    this.auth.login(email!, password!);
    this.submitting.set(false);
  }
}
