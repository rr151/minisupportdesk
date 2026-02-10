import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ticket, TicketPriority, TicketStatus } from '../models/ticket.model';

export interface TicketListParams {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  tags?: string[];
  assignedTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TicketListResponse {
  items: Ticket[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(private readonly http: HttpClient) {}

  list(params: TicketListParams): Observable<TicketListResponse> {
    let httpParams = new HttpParams();

    if (params.status?.length) {
      params.status.forEach((status) => {
        httpParams = httpParams.append('status', status);
      });
    }

    if (params.priority?.length) {
      params.priority.forEach((priority) => {
        httpParams = httpParams.append('priority', priority);
      });
    }

    if (params.tags?.length) {
      params.tags.forEach((tag) => {
        httpParams = httpParams.append('tags', tag);
      });
    }

    if (params.assignedTo) {
      httpParams = httpParams.set('assignedTo', params.assignedTo);
    }

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    if (params.page) {
      httpParams = httpParams.set('page', String(params.page));
    }

    if (params.limit) {
      httpParams = httpParams.set('limit', String(params.limit));
    }

    return this.http.get<TicketListResponse>(`${environment.apiUrl}/tickets`, {
      params: httpParams
    });
  }
}
