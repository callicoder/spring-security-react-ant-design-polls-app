import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { PollInfo } from 'src/app/poll-list/models/poll-info';
import { UserFacade } from '../../store/user.facade';

@Component({
  selector: 'app-user-poll-list',
  templateUrl: './user-poll-list.component.html',
  styleUrls: ['./user-poll-list.component.scss'],
})
export class UserPollListComponent implements OnInit {
  @Input() username: string;
  polls$: Observable<PollInfo[]>;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.polls$ = this.userFacade.userPollCreatedList$;
    this.userFacade.getPollsCreatedBy(this.username);
  }
}
