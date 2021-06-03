import { createAction, props } from '@ngrx/store';
import { MessageInfo } from 'src/app/poll-list/models/message-info';
import { AuthRequestInfo } from '../models/auth-request-info';
import { SignUpRequestInfo } from '../models/signup-request-info';
import { UserInfo } from './auth.state';

export const login = createAction(
  '[auth] LOGIN',
  props<{ authRequest: AuthRequestInfo }>()
);

export const loginSuccess = createAction(
  '[auth] LOGIN_SUCCESS',
  props<{ accessToken: string }>()
);

export const loginFail = createAction(
  '[auth] LOGIN_FAIL',
  props<{ message: MessageInfo }>()
);

// export const loginRedirect = createAction('[auth] LOGIN_REDIRECT');

export const logout = createAction('[auth] LOG_OUT');

export const getCurrentUser = createAction('[auth] GET_CURRENT_USER');

export const getCurrentUserSuccess = createAction(
  '[auth] GET_CURRENT_USER_SUCCESS',
  props<{ user: UserInfo }>()
);
export const getCurrentUserFail = createAction(
  '[auth] GET_CURRENT_USER_FAIL',
  props<{ error: Error }>()
);

export const signup = createAction(
  '[auth] SIGNUP',
  props<{ signUpRequest: SignUpRequestInfo }>()
);

export const signupSuccess = createAction('[auth] SIGNUP_SUCCESS');

export const signupFail = createAction(
  '[auth] SIGNUP_FAIL',
  props<{ message: MessageInfo }>()
);

export const checkAuth = createAction('[auth] Check auth');

export const checkAuthSuccess = createAction(
  '[auth] Check auth success',
  props<{ isAuthenticated: boolean }>()
);

export const setNotAuthenticated = createAction(
  '[auth] Not authenticated',
  props<{ isAuthenticated: boolean }>()
);
