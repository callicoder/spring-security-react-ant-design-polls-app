import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

// import * as UserActions from './user.actions';
import { UserService } from '../services/user.service';
import { UserFacade } from './user.facade';
// import * as AuthActions from 'src/app/auth/store/auth.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userFacade: UserFacade,
    private userService: UserService
  ) {}

  // loginOrRegisterSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.loginSuccess),
  //       tap((action) => {
  //         this.userFacade.getCurrentUser();
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // getCurrentUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.getCurrentUser),
  //     switchMap((result) =>
  //       this.userService.getCurrentUser().pipe(
  //         map((user) => UserActions.getCurrentUserSuccess({ user })),
  //         catchError((error) => of(UserActions.getCurrentUserFail(error)))
  //       )
  //     )
  //   )
  // );
}
