import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PollInfo } from 'src/app/poll-list/models/poll-info';
import { UserFacade } from '../../store/user.facade';

@Component({
  selector: 'app-user-vote-list',
  templateUrl: './user-vote-list.component.html',
  styleUrls: ['./user-vote-list.component.scss'],
})
export class UserVoteListComponent implements OnInit {
  @Input() username: string;
  polls$: Observable<PollInfo[]>;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.polls$ = this.userFacade.userPollVotedList$;
    this.userFacade.getPollsVotedBy(this.username);
  }
}
