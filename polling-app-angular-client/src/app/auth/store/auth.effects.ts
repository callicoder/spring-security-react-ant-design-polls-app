import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  tap,
  switchMap,
  take,
  filter,
} from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { AuthFacade } from './auth.facade';
import { AlertService } from '@full-fledged/alerts';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private localStorageJwtService: LocalStorageJwtService,
    private authFacade: AuthFacade,
    private alertService: AlertService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.authenticateUser(action.authRequest).pipe(
          map((response) =>
            AuthActions.loginSuccess({ accessToken: response.accessToken })
          ),
          catchError((error) => of(AuthActions.loginFail(error)))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.localStorageJwtService.setItem(action.accessToken);
          this.authFacade.getCurrentUser();
          this.alertService.success("You're successfully logged in.");
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFail),
        map(() => {
          this.alertService.danger('Your Username or Password is incorrect.');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.localStorageJwtService.removeItem();
          this.alertService.success("You're successfully logged out.");
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getCurrentUser),
      switchMap(() =>
        this.authService.getCurrentUser().pipe(
          map((user) => AuthActions.getCurrentUserSuccess({ user })),
          catchError((error) => of(AuthActions.getCurrentUserFail(error)))
        )
      )
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap((action) =>
        this.authService.registerUser(action.signUpRequest).pipe(
          map((response) => AuthActions.signupSuccess()),
          catchError((error) => of(AuthActions.signupFail(error)))
        )
      )
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap((action) => {
          this.alertService.success(
            "Thank you! You're successfully registered. Please Login to continue!"
          );
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  signUpFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupFail),
        tap((error) => {
          this.alertService.danger(error.message.text);
        })
      ),
    { dispatch: false }
  );

  checAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.checkAuth),
        switchMap(() =>
          this.localStorageJwtService.getItem().pipe(
            take(1),
            filter((token) => !!token),
            tap(() => {
              this.authFacade.getCurrentUser();
              AuthActions.checkAuthSuccess({ isAuthenticated: true });
            }),
            catchError(() =>
              of(AuthActions.setNotAuthenticated({ isAuthenticated: false }))
            )
          )
        )
      ),
    { dispatch: false }
  );
}
