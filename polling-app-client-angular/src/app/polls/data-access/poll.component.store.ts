import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { PollService } from './poll.service';
import { PollResponse } from './models/poll-response';
import {
  PageRequest,
  PaginatedResult,
} from 'src/app/shared/data-access/models/pagination';
import { EMPTY, Observable } from 'rxjs';

export interface PollState {
  polls: PaginatedResult<PollResponse[]>;
}

@Injectable({
  providedIn: 'root',
})
export class PollComponentStore extends ComponentStore<PollState> {
  readonly polls$ = this.select((state) => state.polls);

  loadPolls = this.effect((pageRequest$: Observable<PageRequest>) =>
    pageRequest$.pipe(
      switchMap((pageRequest) => {
        return this.pollService.getPolls(pageRequest).pipe(
          tap({
            next: (polls) => {
              this.setState({ polls });
            },
          })
        );
      })
    )
  );

  getPollsCreatedBy = this.effect((request$: Observable<any>) =>
    request$.pipe(
      switchMap((request) => {
        return this.pollService
          .getPollsCreatedBy(request.username, request.pageRequest)
          .pipe(
            tap({
              next: (polls) => {
                this.setState({ polls });
              },
            }),
            catchError(() => EMPTY)
          );
      })
    )
  );

  constructor(private pollService: PollService) {
    super({ polls: {} as PaginatedResult<[]> });
  }
}
