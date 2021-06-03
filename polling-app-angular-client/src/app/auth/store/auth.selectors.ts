import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthInfo, AUTH_STATE_NAME } from './auth.state';

const selectAuthState = createFeatureSelector<AuthInfo>(AUTH_STATE_NAME);

const getLoggedIn = createSelector(
  selectAuthState,
  (auth: AuthInfo) => auth.loggedIn
);

const getCurrentUser = createSelector(
  selectAuthState,
  (auth: AuthInfo) => auth.user
);

export const AuthStoreQuery = {
  getLoggedIn,
  getCurrentUser,
};
