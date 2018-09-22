import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PollInfo } from './../models/poll-info';
import { VoteInfo } from '../models/vote-info';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { }

  getAllPolls(page, size) {
    page = page || 0;
    size = size || 30;
    return this.http.get<any>(`/api/polls?page=${page}&size=${size}`);
  }

  getUserCreatedPolls(username, page, size) {
    page = page || 0;
    size = size || 30;
    return this.http.get<any>(`/api/users/${username}/polls?page=${page}&size=${size}`);
  }

  getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || 30;
    return this.http.get<any>(`/api/users/${username}/votes?page=${page}&size=${size}`);
  }

  createPoll(pollData) {
    let polRequest = {
      question: pollData.question,
      choices: pollData.choices,
      pollLength: {
        days: pollData.days,
        hours: pollData.hours
      }
    }
    return this.http.post('/api/polls', polRequest);
  }

  castPoll(voteData: VoteInfo) {
    return this.http.post<any>(`/api/polls/${voteData.pollId}/votes`, voteData);
  }

}
