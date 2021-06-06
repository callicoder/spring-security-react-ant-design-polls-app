import { SignUpRequestInfo } from './../../modules/auth/models/signup-request-info';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../index';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromAuthSelectors from '../selectors/auth.selectors';
import { LoginRequestInfo } from 'src/app/modules/auth/models/login-request-info';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  user$ = this.store.select(fromAuthSelectors.selectUser);
  isLoggedIn$ = this.store.select(fromAuthSelectors.selectIsLoggedIn);

  constructor(private store: Store<AppState>) {}

  login(loginRequest: LoginRequestInfo) {
    this.store.dispatch(fromAuthActions.login({ loginRequest: loginRequest }));
  }

  logout() {
    this.store.dispatch(fromAuthActions.logout());
  }

  register(signUpRequest: SignUpRequestInfo) {
    this.store.dispatch(fromAuthActions.registerUser({ signUpRequest }));
  }

  browserReload() {
    this.store.dispatch(fromAuthActions.browserReload());
  }

  checkAuth(): boolean {
    let isAuthenticated = false;

    this.store.dispatch(fromAuthActions.checkAuth());

    this.isLoggedIn$.subscribe((authState) => {
      isAuthenticated = authState;
    });

    return isAuthenticated;
  }
}
