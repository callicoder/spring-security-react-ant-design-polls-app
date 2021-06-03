import { map, mergeMap, catchError } from 'rxjs/operators';
import { PollListService } from './../services/poll-list.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PollActions from './polls.actions';
import { of } from 'rxjs';

@Injectable()
export class PollEffects {
  constructor(
    private actions$: Actions,
    private pollListService: PollListService
  ) {}

  loadPolls$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PollActions.loadPolls),
      mergeMap((action) =>
        this.pollListService.getPolls(action.page, action.size).pipe(
          map((data) =>
            PollActions.loadPollsSuccess({ paginatedResult: data })
          ),
          catchError((error) => of(PollActions.loadPollsFailure({ error })))
        )
      )
    );
  });
}
