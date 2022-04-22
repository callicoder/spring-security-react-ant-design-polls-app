import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { AlertService } from '@full-fledged/alerts';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { LoginRequest } from './modules/login-request';
import { UserProfile } from './modules/user-profile';

export interface UserState {
  userProfile: UserProfile;
}

@Injectable({
  providedIn: 'root',
})
export class UserComponentStore extends ComponentStore<UserState> {
  userProfile$ = this.select((state) => state.userProfile);

  login = this.effect((credentials$: Observable<LoginRequest>) =>
    credentials$.pipe(
      switchMap((credentials) =>
        this.userService.authenticateUser(credentials).pipe(
          tap({
            next: (loginResponse) => {
              this.userService.setTokenInLocalStorage(
                loginResponse.accessToken
              );
              this.loadCurrentUser();
              this.alertService.success('You are logged in');
              this.router.navigate(['/']);
            },
            error: () => {
              this.resetState();
              this.alertService.danger('Unable to login');
            },
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadCurrentUser = this.effect(($) =>
    $.pipe(
      switchMap(() =>
        this.userService.getCurrentUser().pipe(
          tap({
            next: (user) => {
              this.setState({ userProfile: user });
            },
            error: () => {
              if (!this.userService.getTokenFromLocalStorage()) {
                this.resetState();
                this.router.navigate(['/login']);
              }
            },
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  logout = this.effect(($) =>
    $.pipe(
      tap({
        next: () => {
          this.resetState();
          this.alertService.warning('You are logged out');
          this.router.navigate(['/']);
        },
      }),
      catchError(() => EMPTY)
    )
  );

  resetState = this.effect(($) =>
    $.pipe(
      tap(() => {
        this.userService.removeTokenFromLocalStorage();
        this.setState({ userProfile: {} as UserProfile });
      })
    )
  );

  getUserProfile = this.effect((username$: Observable<string>) =>
    username$.pipe(
      switchMap((username) =>
        this.userService.getUserProfile(username).pipe(
          tap({
            next: (user) => {
              this.setState({ userProfile: user });
            },
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  checkAuth = this.effect(($) =>
    $.pipe(
      tap({
        next: () => {
          this.userProfile$.pipe(
            tap((userProfile) => {
              if (!userProfile) {
                this.alertService.warning('Please login to vote.');
                this.router.navigate(['/login']);
              }
            })
          );
        },
      }),
      catchError(() => EMPTY)
    )
  );

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    super({ userProfile: {} as UserProfile });
  }
}
