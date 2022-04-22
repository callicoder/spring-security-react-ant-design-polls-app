import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserIdentityAvailability } from './modules/user-identity-availability';
import { SignupRequest } from './modules/signup-request';
import { LoginRequest } from './modules/login-request';
import { LoginResponse } from './modules/login-response';
import { UserProfile } from './modules/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public registerUser(signupRequest: SignupRequest) {
    return this.http.post('/api/auth/signup', signupRequest);
  }

  public authenticateUser(
    loginRequest: LoginRequest
  ): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/signin', loginRequest);
  }

  public getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`/api/user/me`);
  }

  public checkUsernameAvailability(
    username: string
  ): Observable<UserIdentityAvailability> {
    return this.http.get<UserIdentityAvailability>(
      `/api/user/checkUsernameAvailability?username=${username}`
    );
  }

  public checkEmailAvailability(
    email: string
  ): Observable<UserIdentityAvailability> {
    return this.http.get<UserIdentityAvailability>(
      `/api/user/checkEmailAvailability?email=${email}`
    );
  }

  public getUserProfile(username: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`/api/users/${username}`);
  }

  public getTokenFromLocalStorage(): Observable<string | null> {
    return of(localStorage.getItem('jwtToken'));
  }

  public setTokenInLocalStorage(data: string): Observable<string> {
    localStorage.setItem('jwtToken', data);
    return of(data);
  }

  public removeTokenFromLocalStorage(): Observable<boolean> {
    localStorage.removeItem('jwtToken');
    return of(true);
  }
}
