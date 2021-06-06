import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromPollActions from '../../modules/polls/state/poll.actions';

@Injectable()
export class SpinnerEffects {
  spinneron$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.login,
          fromAuthActions.registerUser,
          fromPollActions.loadPolls
        ),
        tap(() => this.spinner.show())
      ),
    { dispatch: false }
  );

  spinneroff$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.loginFailure,
          fromAuthActions.loadUserSuccess,
          fromAuthActions.loadUserFailure,
          fromAuthActions.registerUserFailure,
          fromAuthActions.registerUserSuccess,
          fromPollActions.loadPollsFailure,
          fromPollActions.loadPollsSuccess
        ),
        tap(() => this.spinner.hide())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private spinner: NgxSpinnerService) {}
}
