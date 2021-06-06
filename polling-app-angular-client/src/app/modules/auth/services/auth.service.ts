import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LoginResponseInfo } from '../models/login-response-info';
import { LoginRequestInfo } from '../models/login-request-info';
import { UserInfo } from '../models/user-info';
import { SignUpRequestInfo } from '../models/signup-request-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequestInfo): Observable<LoginResponseInfo> {
    return this.http.post<LoginResponseInfo>('/api/auth/signin', loginRequest);
  }

  registerUser(signUpRequest: SignUpRequestInfo) {
    return this.http.post('/api/auth/signup', signUpRequest);
  }

  getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`/api/user/me`);
  }

  checkUsernameAvailability(username: string) {
    return this.http.get<any>(
      `/api/user/checkUsernameAvailability?username=${username}`
    );
  }

  checkEmailAvailability(email: string) {
    return this.http.get<any>(
      `/api/user/checkEmailAvailability?email=${email}`
    );
  }

  getTokenFromLocalStorage(): Observable<string | null> {
    const data = localStorage.getItem('jwtToken');
    if (data) {
      return of(data);
    }
    return of(null);
  }

  setTokenInLocalStorage(data: string): Observable<string> {
    localStorage.setItem('jwtToken', data);
    return of(data);
  }

  removeTokenFromLocalStorage(): Observable<boolean> {
    localStorage.removeItem('jwtToken');
    return of(true);
  }
}
