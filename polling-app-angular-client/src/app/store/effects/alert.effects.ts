import { Injectable } from '@angular/core';
import { AlertService } from '@full-fledged/alerts';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromPollActions from '../../modules/polls/state/poll.actions';

@Injectable()
export class AlertEffects {
  unableToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loginFailure),
        tap(() => this.alertService.danger('Unable to login'))
      ),
    { dispatch: false }
  );

  unableToLoadUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loadUserFailure),
        tap(() => this.alertService.danger('Unable to load user'))
      ),
    { dispatch: false }
  );

  youAreLoggedOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.logout),
        tap(() => this.alertService.warning('You are logged out'))
      ),
    { dispatch: false }
  );

  youAreLoggedIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loadUserSuccess),
        tap(() => this.alertService.success('You are logged in'))
      ),
    { dispatch: false }
  );

  youAreRegistered$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.registerUserSuccess),
        tap(() =>
          this.alertService.success(
            "Thank you! You're successfully registered. Please Login to continue!"
          )
        )
      ),
    { dispatch: false }
  );

  unableToRegisterUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.registerUserFailure),
        tap(() => this.alertService.danger('Unable to register user'))
      ),
    { dispatch: false }
  );

  userIsNotLoggedIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.checkAuthFailure),
        tap(() => this.alertService.danger('Please login to vote.'))
      ),
    { dispatch: false }
  );

  unableToLoadPolls$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromPollActions.loadPollsFailure),
        tap(() => this.alertService.danger('Unable to load polls'))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private alertService: AlertService) {}
}
