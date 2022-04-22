import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { first, of, switchMap, tap } from 'rxjs';
import { PageRequest } from 'src/app/shared/data-access/models/pagination';
import { UserService } from 'src/app/users/data-access/user.service';
import { VoteRequest } from '../../data-access/models/vote-request';
import { PollComponentStore } from '../../data-access/poll.component.store';
import { PollService } from '../../data-access/poll.service';

@Component({
  selector: 'app-poll-dashboard',
  templateUrl: './poll-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollDashboardComponent implements OnInit {
  polls$ = this.pollComponentStore.polls$;

  constructor(
    private pollComponentStore: PollComponentStore,
    private pollService: PollService,
    private alertService: AlertService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.pollComponentStore.loadPolls({ page: 0, size: 5 });
  }

  onPaginationChange(pageRequest: PageRequest) {
    this.pollComponentStore.loadPolls(pageRequest);
  }

  onVote(voteRequest: VoteRequest) {
    this.userService
      .getTokenFromLocalStorage()
      .pipe()
      .subscribe((token) => {
        if (token) {
          this.submitVoteRequest(voteRequest);
        } else {
          this.alertService.warning('Please login to vote.');
          this.router.navigate(['/login']);
        }
      });

    // this.userComponentStore.userProfile$.pipe().subscribe((userProfile) => {
    //   if (!userProfile) {
    //     this.alertService.warning('Please login to vote.');
    //     this.router.navigate(['/login']);
    //   }
    // });

    // if (!this.authFacade.checkAuth()) {
    //   return;
    // }

    // let voteData = {} as VoteInfo;
    // voteData.pollId = this.poll.id;
    // voteData.choiceId = this.voteForm.get('choiceGroup')?.value;
    // this.pollFacade
    //   .castVote(voteData)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.poll = data;
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }

  private submitVoteRequest(voteRequest: VoteRequest) {
    this.pollService
      .castVote(voteRequest)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Successfully voted');
          this.pollComponentStore.loadPolls({ page: 0, size: 5 });
        },
        error: () => {
          this.alertService.danger('Unable to vote');
        },
      });
  }
}
