// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { VoteInfo } from '../../core/models/vote-info';
// import { PollInfo } from 'src/app/core/models/poll-info';

@Injectable()
export class PollService {
  constructor(private http: HttpClient) {}

  create(polRequest) {
    return this.http.post('/api/polls', polRequest);
  }

  // getPolls(page: number, size: number): Observable<PollInfo[]> {
  //   page = page || 0;
  //   size = size || 30;
  //   return this.http.get<any>(`/api/polls?page=${page}&size=${size}`).pipe(
  //     map((data) => {
  //       return data.content;
  //     })
  //   );
  // }

  // getUserCreatedPolls(username, page, size) {
  //   page = page || 0;
  //   size = size || 30;
  //   return this.http.get<any>(
  //     `/api/users/${username}/polls?page=${page}&size=${size}`
  //   );
  // }

  // getUserVotedPolls(username, page, size) {
  //   page = page || 0;
  //   size = size || 30;
  //   return this.http.get<any>(
  //     `/api/users/${username}/votes?page=${page}&size=${size}`
  //   );
  // }

  // createPoll(pollData) {
  //   let polRequest = {
  //     question: pollData.question,
  //     choices: pollData.choices,
  //     pollLength: {
  //       days: pollData.days,
  //       hours: pollData.hours,
  //     },
  //   };
  //   return this.http.post('/api/polls', polRequest);
  // }

  // castPoll(voteData: VoteInfo) {
  //   return this.http.post<any>(`/api/polls/${voteData.pollId}/votes`, voteData);
  // }
}
