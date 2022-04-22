import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PollResponse } from './models/poll-response';
import {
  PageRequest,
  PaginatedResult,
  Pagination,
} from 'src/app/shared/data-access/models/pagination';
import { VoteRequest } from './models/vote-request';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private http: HttpClient) {}

  public getPolls(
    pageRequest: PageRequest
  ): Observable<PaginatedResult<PollResponse[]>> {
    let paginatedResult: PaginatedResult<PollResponse[]> = {
      content: {} as PollResponse[],
      pagination: {} as Pagination,
    };

    return this.http
      .get<any>(`/api/polls?page=${pageRequest.page}&size=${pageRequest.size}`)
      .pipe(
        map((data) => {
          paginatedResult.content = data.content;
          paginatedResult.pagination.page = data.page;
          paginatedResult.pagination.size = data.size;
          paginatedResult.pagination.totalElements = data.totalElements;
          paginatedResult.pagination.totalPages = data.totalPages;
          paginatedResult.pagination.last = data.last;
          return paginatedResult;
        })
      );
  }

  public getPollsCreatedBy(
    username: string,
    pageRequest: PageRequest = { page: 0, size: 5 }
  ): Observable<PaginatedResult<PollResponse[]>> {
    return this.http.get<PaginatedResult<PollResponse[]>>(
      `/api/users/${username}/polls?page=${pageRequest.page}&size=${pageRequest.size}`
    );
  }

  public getPollsVotedBy(
    username: string,
    pageRequest: PageRequest = { page: 0, size: 5 }
  ): Observable<PaginatedResult<PollResponse[]>> {
    return this.http.get<PaginatedResult<PollResponse[]>>(
      `/api/users/${username}/votes?page=${pageRequest.page}&size=${pageRequest.size}`
    );
  }

  public createPoll(pollData: any) {
    let polRequest = {
      question: pollData.question,
      choices: pollData.choices,
      pollLength: {
        days: pollData.days,
        hours: pollData.hours,
      },
    };

    return this.http.post('/api/polls', polRequest);
  }

  castVote(voteRequest: VoteRequest) {
    return this.http.post<any>(
      `/api/polls/${voteRequest.pollId}/votes`,
      voteRequest
    );
  }
}
