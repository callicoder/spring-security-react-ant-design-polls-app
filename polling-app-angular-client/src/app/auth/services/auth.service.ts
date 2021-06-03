import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthResponseInfo } from '../models/auth-response-info';
import { AuthRequestInfo } from '../models/auth-request-info';
import { UserInfo } from '../store/auth.state';
import { SignUpRequestInfo } from '../models/signup-request-info';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticateUser(
    loginRequest: AuthRequestInfo
  ): Observable<AuthResponseInfo> {
    return this.http.post<AuthResponseInfo>('/api/auth/signin', loginRequest);
  }

  registerUser(signUpRequest: SignUpRequestInfo) {
    return this.http.post('/api/auth/signup', signUpRequest);
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`/api/user/me`);
  }

  // getErrorMessage(message: string): MessageInfo {
  //   return {
  //     text: message,
  //     type: 'error',
  //   };
  // }
}
