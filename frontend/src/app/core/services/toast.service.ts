import { Injectable, signal } from '@angular/core';

export type ToastType = 'error' | 'success' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSignal = signal<Toast[]>([]);
  toasts = this.toastsSignal.asReadonly();

  show(message: string, type: ToastType = 'info', durationMs = 4000) {
    const toast: Toast = {
      id: crypto.randomUUID(),
      type,
      message
    };

    this.toastsSignal.update((items) => [...items, toast]);
    setTimeout(() => this.remove(toast.id), durationMs);
  }

  error(message: string) {
    this.show(message, 'error');
  }

  success(message: string) {
    this.show(message, 'success');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  remove(id: string) {
    this.toastsSignal.update((items) => items.filter((item) => item.id !== id));
  }
}
