import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromPollActions from './poll.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as PollSelector from './poll.selectors';
import { PollService } from '../services/poll.service';
import { VoteInfo } from '../models/vote-info';

@Injectable({
  providedIn: 'root',
})
export class PollFacade {
  vm$: Observable<PollSelector.PollsViewModel> = this.store.pipe(
    select(PollSelector.selectPollsViewModel)
  );

  constructor(
    private store: Store<AppState>,
    private pollService: PollService
  ) {}

  loadPolls(page: number = 0, size: number = 5) {
    this.store.dispatch(fromPollActions.loadPolls({ page: page, size: size }));
  }

  createPoll(pollData) {
    let polRequest = {
      question: pollData.question,
      choices: pollData.choices,
      pollLength: {
        days: pollData.days,
        hours: pollData.hours,
      },
    };
    return this.pollService.create(polRequest);
  }

  castVote(voteData: VoteInfo) {
    return this.pollService.castVote(voteData);
  }
}
