import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { TicketsFacade } from '../../store/tickets.facade';
import { TicketPriority, TicketStatus } from '../../../../core/models/ticket.model';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent {
  private readonly facade = inject(TicketsFacade);

  tickets$ = this.facade.tickets$;
  loading$ = this.facade.loading$;
  total = toSignal(this.facade.total$, { initialValue: 0 });

  searchTerm = signal('');
  statusFilter = signal<'ALL' | TicketStatus>('ALL');
  priorityFilter = signal<'ALL' | TicketPriority>('ALL');
  pageSize = signal(10);
  page = signal(1);

  totalPages = computed(() => {
    const total = this.total();
    return Math.max(1, Math.ceil(total / this.pageSize()));
  });

  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1)
  );

  constructor() {
    this.load();
  }

  load() {
    const statusValue = this.statusFilter();
    const priorityValue = this.priorityFilter();
    const status: TicketStatus[] | undefined =
      statusValue === 'ALL' ? undefined : [statusValue];
    const priority: TicketPriority[] | undefined =
      priorityValue === 'ALL' ? undefined : [priorityValue];

    this.facade.load({
      status,
      priority,
      search: this.searchTerm().trim() || undefined,
      page: this.page(),
      limit: this.pageSize()
    });
  }

  setPage(page: number) {
    const safe = Math.min(Math.max(1, page), this.totalPages());
    this.page.set(safe);
    this.load();
  }

  nextPage() {
    this.setPage(this.page() + 1);
  }

  previousPage() {
    this.setPage(this.page() - 1);
  }

  onPageSizeChange(value: number) {
    this.pageSize.set(value);
    this.page.set(1);
    this.load();
  }

  clearFilters() {
    this.searchTerm.set('');
    this.statusFilter.set('ALL');
    this.priorityFilter.set('ALL');
    this.page.set(1);
    this.load();
  }
}
