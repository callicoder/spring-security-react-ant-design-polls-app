import { AuthRequestInfo } from '../models/auth-request-info';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthStoreActions from './auth.actions';
import { AuthStoreQuery } from './auth.selectors';
import { AuthState } from './auth.state';
import { SignUpRequestInfo } from '../models/signup-request-info';

@Injectable()
export class AuthFacade {
  currentUser$ = this.store.select(AuthStoreQuery.getCurrentUser);
  isLoggedIn$ = this.store.select(AuthStoreQuery.getLoggedIn);

  constructor(private store: Store<AuthState>) {}

  login(loginRequest: AuthRequestInfo) {
    this.store.dispatch(AuthStoreActions.login({ authRequest: loginRequest }));
  }

  logout() {
    this.store.dispatch(AuthStoreActions.logout());
  }

  register(signUpRequest: SignUpRequestInfo) {
    this.store.dispatch(AuthStoreActions.signup({ signUpRequest }));
  }

  getCurrentUser() {
    this.store.dispatch(AuthStoreActions.getCurrentUser());
  }

  isAuthenticated() {
    this.store.dispatch(AuthStoreActions.checkAuth());
  }
}
