import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PollInfo } from 'src/app/poll-list/models/poll-info';
import { PollsState, PaginationInfo } from './polls.state';
import * as PollActions from './polls.actions';
import * as PollSelectors from './polls.selectors';

@Injectable()
export class PollListFacade {
  polls$: Observable<PollInfo[]> = this.store.select(PollSelectors.getPolls);
  pagination$: Observable<PaginationInfo> = this.store.select(
    PollSelectors.getPagination
  );

  constructor(private store: Store<PollsState>) {}

  getList(page: number = 0, size: number = 30) {
    this.store.dispatch(PollActions.loadPolls({ page, size }));
  }
}
