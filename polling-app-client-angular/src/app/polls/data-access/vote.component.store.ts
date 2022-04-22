import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { PollService } from './poll.service';
import { PollResponse } from './models/poll-response';
import { PaginatedResult } from 'src/app/shared/data-access/models/pagination';
import { EMPTY, Observable } from 'rxjs';

export interface PollState {
  votes: PaginatedResult<PollResponse[]>;
}

@Injectable({
  providedIn: 'root',
})
export class VoteComponentStore extends ComponentStore<PollState> {
  readonly votes$ = this.select((state) => state.votes);

  getPollsVotedBy = this.effect((request$: Observable<any>) =>
    request$.pipe(
      switchMap((request) => {
        return this.pollService
          .getPollsVotedBy(request.username, request.pageRequest)
          .pipe(
            tap({
              next: (votes) => {
                this.setState({ votes });
              },
            }),
            catchError(() => EMPTY)
          );
      })
    )
  );

  constructor(private pollService: PollService) {
    super({ votes: {} as PaginatedResult<[]> });
  }
}
