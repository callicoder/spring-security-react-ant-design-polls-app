import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfileInfo } from '../../polls/models/user-profile-info';
import { PollInfo } from 'src/app/modules/polls/models/poll-info';
import * as fromPollSelectors from '../../polls/state/poll.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  private userInfo$ = new BehaviorSubject<UserProfileInfo>(null);
  userProfile$: Observable<UserProfileInfo> = this.userInfo$;

  private pollCreatedList$ = new BehaviorSubject<PollInfo[]>([]);
  userPollCreatedList$: Observable<PollInfo[]> = this.pollCreatedList$;
  // userPollCreatedList$: Observable<PollInfo[]>;

  private pollVotedList$ = new BehaviorSubject<PollInfo[]>([]);
  userPollVotedList$: Observable<PollInfo[]> = this.pollVotedList$;

  isPollInStore$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  getUserProfile(username: string) {
    this.userService
      .getUserProfile(username)
      .subscribe((userInfo) => this.userInfo$.next(userInfo));
  }

  getPollsCreatedBy(username: string) {
    // this.isPollInStore$ = this.store.pipe(
    //   select(fromPollSelectors.entityExists, { username: username })
    // );

    // this.userPollCreatedList$ = this.isPollInStore$.pipe(
    //   mergeMap((isPollInStore) => {
    //     if (!isPollInStore) {
    //       console.log('Get poll from API');
    //     }

    //     return this.store.pipe(
    //       select(fromPollSelectors.selectEntityById, { username: username })
    //     );
    //   })
    // );
    this.userService.getPollsCreatedBy(username, 0, 5).subscribe((pollList) => {
      this.pollCreatedList$.next(pollList);
    });
  }

  getPollsVotedBy(username: string) {
    this.userService
      .getPollsVotedBy(username, 0, 5)
      .subscribe((pollList) => this.pollVotedList$.next(pollList));
  }
}
