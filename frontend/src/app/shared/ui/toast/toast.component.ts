import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-stack" *ngIf="toasts().length">
      <div
        class="toast"
        *ngFor="let toast of toasts()"
        [class.error]="toast.type === 'error'"
        [class.success]="toast.type === 'success'"
        [class.info]="toast.type === 'info'"
      >
        <span>{{ toast.message }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      .toast-stack {
        position: fixed;
        top: 1.25rem;
        right: 1.25rem;
        display: grid;
        gap: 0.75rem;
        z-index: 9999;
      }
      .toast {
        padding: 0.75rem 1rem;
        border-radius: 12px;
        background: rgba(20, 24, 32, 0.95);
        color: #f8faff;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
        min-width: 240px;
        animation: toast-in 0.25s ease;
      }
      .toast.error {
        border-color: rgba(255, 112, 112, 0.5);
        color: #ffe8e8;
      }
      .toast.success {
        border-color: rgba(111, 255, 170, 0.5);
        color: #e9fff4;
      }
      .toast.info {
        border-color: rgba(112, 196, 255, 0.5);
        color: #e9f6ff;
      }
      @keyframes toast-in {
        from {
          transform: translateY(-8px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `
  ]
})
export class ToastComponent {
  private readonly toastService = inject(ToastService);
  toasts = this.toastService.toasts;
}
