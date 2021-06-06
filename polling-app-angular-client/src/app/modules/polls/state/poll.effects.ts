import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PollService } from '../services/poll.service';
import * as PollActions from './poll.actions';

@Injectable()
export class PollEffects {
  loadPolls$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PollActions.loadPolls),
      mergeMap((action) =>
        this.pollService.getPolls(action.page, action.size).pipe(
          map((data) =>
            PollActions.loadPollsSuccess({ paginatedResult: data })
          ),
          catchError((error) => of(PollActions.loadPollsFailure({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private pollService: PollService) {}
}
