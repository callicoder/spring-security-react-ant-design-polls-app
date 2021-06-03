export const AUTH_STATE_NAME = 'auth';

export interface UserInfo {
  id: number;
  username: string;
  name: string;
}

export interface AuthInfo {
  accessToken: string;
  user: UserInfo | null;
  loggedIn: boolean;
}

export interface AuthState {
  readonly [AUTH_STATE_NAME]: AuthInfo;
}

export const authInitialState: AuthInfo = {
  accessToken: '',
  user: null,
  loggedIn: false,
};
