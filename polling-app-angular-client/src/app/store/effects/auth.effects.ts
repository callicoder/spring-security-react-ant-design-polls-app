import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  tap,
  switchMap,
  take,
  filter,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap((action) =>
        this.authService.login(action.loginRequest).pipe(
          map((loginResponse) =>
            AuthActions.loginSuccess({
              accessToken: loginResponse.accessToken,
            })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap((action) =>
        this.authService.setTokenInLocalStorage(action.accessToken)
      ),
      concatMap(() =>
        this.authService.getUser().pipe(
          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError((error) => of(AuthActions.loadUserFailure({ error })))
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      concatMap((action) =>
        this.authService.registerUser(action.signUpRequest).pipe(
          map((response) => AuthActions.registerUserSuccess()),
          catchError((error) => of(AuthActions.registerUserFailure(error)))
        )
      )
    )
  );

  browserReload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.browserReload),
      switchMap(() =>
        this.authService.getTokenFromLocalStorage().pipe(
          take(1),
          filter((token) => !!token),
          concatMap(() =>
            this.authService.getUser().pipe(
              map((user) => AuthActions.browserReloadSuccess({ user })),
              catchError((error) => of(AuthActions.loadUserFailure({ error })))
            )
          )
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.removeTokenFromLocalStorage();
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
