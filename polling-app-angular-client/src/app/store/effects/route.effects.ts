import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromAuthActions from '../actions/auth.actions';

@Injectable()
export class RouteEffects {
  goHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthActions.loadUserSuccess, fromAuthActions.logout),
        tap((action) => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  goLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.registerUserSuccess,
          fromAuthActions.checkAuthFailure
        ),
        tap((action) => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
