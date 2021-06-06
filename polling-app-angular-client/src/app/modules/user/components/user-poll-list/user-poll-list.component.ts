import { Component, OnChanges, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { PollInfo } from 'src/app/modules/polls/models/poll-info';
import { UserFacade } from '../../store/user.facade';

@Component({
  selector: 'app-user-poll-list',
  templateUrl: './user-poll-list.component.html',
  styleUrls: ['./user-poll-list.component.scss'],
})
export class UserPollListComponent implements OnChanges {
  @Input() username: string;
  polls$: Observable<PollInfo[]>;

  constructor(private userFacade: UserFacade) {}

  ngOnChanges() {
    this.polls$ = this.userFacade.userPollCreatedList$;
    this.userFacade.getPollsCreatedBy(this.username);
  }
}
