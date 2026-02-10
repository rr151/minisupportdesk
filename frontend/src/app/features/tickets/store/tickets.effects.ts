import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TicketService } from '../../../core/services/ticket.service';
import * as TicketsActions from './tickets.actions';

@Injectable()
export class TicketsEffects {
  private readonly actions$ = inject(Actions);
  private readonly tickets = inject(TicketService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadTickets),
      switchMap(({ params }) =>
        this.tickets.list(params).pipe(
          map((response) => TicketsActions.loadTicketsSuccess({ response })),
          catchError((error) =>
            of(
              TicketsActions.loadTicketsFailure({
                error: error?.error?.message ?? 'Unexpected error'
              })
            )
          )
        )
      )
    )
  );
}
