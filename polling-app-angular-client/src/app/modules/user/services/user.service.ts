import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PollInfo } from 'src/app/modules/polls/models/poll-info';
import { UserProfileInfo } from '../../polls/models/user-profile-info';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(username: string): Observable<UserProfileInfo> {
    return this.http
      .get<any>(`/api/users/${username}`)
      .pipe(map((userprofile) => userprofile));
  }

  getPollsCreatedBy(
    username: string,
    page: number,
    size: number
  ): Observable<PollInfo[]> {
    page = page || 0;
    size = size || 30;
    return this.http
      .get<any>(`/api/users/${username}/polls?page=${page}&size=${size}`)
      .pipe(map((response) => response.content));
  }

  getPollsVotedBy(
    username: string,
    page: number,
    size: number
  ): Observable<PollInfo[]> {
    page = page || 0;
    size = size || 30;
    return this.http
      .get<any>(`/api/users/${username}/votes?page=${page}&size=${size}`)
      .pipe(map((response) => response.content));
  }
}
