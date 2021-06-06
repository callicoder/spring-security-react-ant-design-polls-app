import { UserInfo } from './../../modules/auth/models/user-info';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: UserInfo;
  error: any;
}

export const initialState: State = {
  user: {
    id: null,
    name: null,
    username: null,
  },
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    AuthActions.loginFailure,
    AuthActions.loadUserFailure,
    (state, action) => ({
      ...state,
      user: {
        id: null,
        name: null,
        username: null,
      },
      error: action.error,
    })
  ),
  on(AuthActions.logout, (state, action) => ({
    ...state,
    user: {
      id: null,
      name: null,
      username: null,
    },
    error: null,
  })),
  on(
    AuthActions.loadUserSuccess,
    AuthActions.browserReloadSuccess,
    (state, action) => ({
      ...state,
      user: action.user,
      error: null,
    })
  )
);
