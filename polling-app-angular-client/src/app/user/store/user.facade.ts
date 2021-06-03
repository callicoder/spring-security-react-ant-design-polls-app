import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfileInfo } from '../models/user-profile-info';
import { PollInfo } from 'src/app/poll-list/models/poll-info';
// import { UserState } from './user.state';
// import { Store } from '@ngrx/store';
// import * as UserStoreActions from './user.actions';
// import { UserStoreQuery } from './user.selector';

@Injectable()
export class UserFacade {
  private userInfo$ = new BehaviorSubject<UserProfileInfo>(null);
  userProfile$: Observable<UserProfileInfo> = this.userInfo$;
  // currentUser$ = this.store.select(UserStoreQuery.getCurrentUser);

  private pollCreatedList$ = new BehaviorSubject<PollInfo[]>([]);
  userPollCreatedList$: Observable<PollInfo[]> = this.pollCreatedList$;

  private pollVotedList$ = new BehaviorSubject<PollInfo[]>([]);
  userPollVotedList$: Observable<PollInfo[]> = this.pollVotedList$;

  constructor(
    // private store: Store<UserState>,
    private userService: UserService
  ) {}

  // getCurrentUser() {
  //   this.store.dispatch(UserStoreActions.getCurrentUser());
  // }

  getUserProfile(username: string) {
    this.userService
      .getUserProfile(username)
      .subscribe((userInfo) => this.userInfo$.next(userInfo));
  }

  getPollsCreatedBy(username: string) {
    this.userService
      .getPollsCreatedBy(username, 0, 5)
      .subscribe((pollList) => this.pollCreatedList$.next(pollList));
  }

  getPollsVotedBy(username: string) {
    this.userService
      .getPollsVotedBy(username, 0, 5)
      .subscribe((pollList) => this.pollVotedList$.next(pollList));
  }
}
