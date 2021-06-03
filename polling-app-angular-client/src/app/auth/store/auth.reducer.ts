import { Action, createReducer, on } from '@ngrx/store';
import { authInitialState, AuthInfo } from './auth.state';
import * as AuthActions from './auth.actions';

const reducer = createReducer(
  authInitialState,
  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    accessToken: action.accessToken,
  })),
  on(AuthActions.getCurrentUserSuccess, (state, action) => ({
    ...state,
    loggedIn: true,
    user: action.user,
  })),
  on(AuthActions.getCurrentUserFail, AuthActions.loginFail, (state, _) => ({
    ...state,
  })),
  on(
    AuthActions.checkAuthSuccess,
    AuthActions.setNotAuthenticated,
    (state, { isAuthenticated }) => {
      return {
        ...state,
        isAuthenticated,
      };
    }
  ),
  on(AuthActions.logout, (state, action) => ({ ...authInitialState }))
);

export function AuthReducer(
  state: AuthInfo | undefined,
  action: Action
): AuthInfo {
  return reducer(state, action);
}
