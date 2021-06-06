import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PollInfo } from 'src/app/modules/polls/models/poll-info';
import { UserFacade } from '../../store/user.facade';

@Component({
  selector: 'app-user-vote-list',
  templateUrl: './user-vote-list.component.html',
  styleUrls: ['./user-vote-list.component.scss'],
})
export class UserVoteListComponent implements OnChanges {
  @Input() username: string;
  polls$: Observable<PollInfo[]>;

  constructor(private userFacade: UserFacade) {}

  ngOnChanges() {
    this.polls$ = this.userFacade.userPollVotedList$;
    this.userFacade.getPollsVotedBy(this.username);
  }
}
