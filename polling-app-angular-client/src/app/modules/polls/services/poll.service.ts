import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../../../shared/models/pagination-info';
import { PollInfo } from '../models/poll-info';
import { VoteInfo } from '../models/vote-info';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  constructor(private http: HttpClient) {}

  create(polRequest) {
    return this.http.post('/api/polls', polRequest);
  }

  getPolls(
    page: number = 0,
    size: number = 30
  ): Observable<PaginatedResult<PollInfo[]>> {
    let paginatedResult: PaginatedResult<PollInfo[]> = {
      content: undefined,
      pagination: {
        page: undefined,
        size: undefined,
        totalElements: undefined,
        totalPages: undefined,
        last: undefined,
      },
    };
    return this.http.get<any>(`/api/polls?page=${page}&size=${size}`).pipe(
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

  castVote(voteData: VoteInfo) {
    return this.http.post<any>(`/api/polls/${voteData.pollId}/votes`, voteData);
  }
}
