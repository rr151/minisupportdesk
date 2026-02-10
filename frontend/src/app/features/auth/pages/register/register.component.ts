import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../store/auth.facade';
import { Role } from '../../../../core/models/role.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  submitting = signal(false);
  roles = [Role.AGENT, Role.CUSTOMER];

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthFacade);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: [Role.CUSTOMER, [Validators.required]]
  });

  submit() {
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    const { email, password, role } = this.form.getRawValue();
    this.auth.register(email!, password!, role!);
    this.submitting.set(false);
  }
}
