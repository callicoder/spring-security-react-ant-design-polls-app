import { createAction, props } from '@ngrx/store';
import { LoginRequestInfo } from 'src/app/modules/auth/models/login-request-info';
import { SignUpRequestInfo } from 'src/app/modules/auth/models/signup-request-info';
import { UserInfo } from 'src/app/modules/auth/models/user-info';

export const login = createAction(
  '[Login Component] Login',
  props<{ loginRequest: LoginRequestInfo }>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login Success',
  props<{ accessToken: string }>()
);

export const loginFailure = createAction(
  '[Auth Effect] Login Failure',
  props<{ error: any }>()
);

export const loadUserSuccess = createAction(
  '[Auth Effect] Load User Success',
  props<{ user: UserInfo }>()
);

export const loadUserFailure = createAction(
  '[Auth Effect] Load User Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Header Component] Logout');

export const registerUser = createAction(
  '[Register Component] Register User',
  props<{ signUpRequest: SignUpRequestInfo }>()
);

export const registerUserSuccess = createAction(
  '[Auth Effect] Register User Success'
);

export const registerUserFailure = createAction(
  '[Auth Effect] Register User Failure',
  props<{ error: any }>()
);

export const browserReload = createAction('[App Component] Browser Reload');

export const browserReloadSuccess = createAction(
  '[Auth Effect] Browser Reload Success',
  props<{ user: UserInfo }>()
);

export const checkAuth = createAction('[Poll Item Component] Check Auth');

export const checkAuthSuccess = createAction(
  '[Auth Effect] Check Auth Success'
);

export const checkAuthFailure = createAction(
  '[Auth Effect] Check Auth Failure'
);
