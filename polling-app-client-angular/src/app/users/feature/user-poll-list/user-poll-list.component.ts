import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PollComponentStore } from 'src/app/polls/data-access/poll.component.store';
import { PageRequest } from 'src/app/shared/data-access/models/pagination';

@Component({
  selector: 'app-user-poll-list',
  templateUrl: './user-poll-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPollListComponent implements OnChanges {
  @Input() username!: string;

  polls$ = this.pollComponentStore.polls$;

  constructor(private pollComponentStore: PollComponentStore) {}

  ngOnChanges() {
    const username = this.username;
    this.pollComponentStore.getPollsCreatedBy({ username });
  }

  onPaginationChange(pageRequest: PageRequest) {
    const username = this.username;
    this.pollComponentStore.getPollsCreatedBy({ username, pageRequest });
  }
}
