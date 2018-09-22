import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap, first } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserInfo } from './../models/user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$: Subject<UserInfo> = new Subject<UserInfo>();

  constructor(private http: HttpClient) { }

  checkUsernameAvailability(username: string) {
    return this.http.get<any>(`/api/user/checkUsernameAvailability?username=${username}`);
  }

  checkEmailAvailability(email: string) {
    return this.http.get<any>(`/api/user/checkEmailAvailability?email=${email}`);
  }

  register(user : UserInfo) {
    return this.http.post('/api/auth/signup', user);
  }

  login(username: string, password: string) {
    return this.http.post<any>('/api/auth/signin', {"usernameOrEmail": username, "password": password})
        // this is just the HTTP call, 
        // we still need to handle the reception of the token
        .pipe(tap(res => this.setSession(res)), // handles the auth result
        shareReplay()); // prevents the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.currentUser$.next(undefined);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getUserProfile(username): any {
    return this.http.get(`/api/users/${username}`);
  }

  getCurrentUser(): UserInfo {
    return JSON.parse(localStorage.getItem('currentUser')) as UserInfo;
  }

  private setSession(authResult) {
    localStorage.setItem('accessToken', authResult.accessToken);

    this.http.get('/api/user/me')
      .pipe(first())
      .subscribe((user: UserInfo) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser$.next(user);
      },
        error => {
          console.log(error);
      });
  }

}
