import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { VoteComponentStore } from 'src/app/polls/data-access/vote.component.store';
import { PageRequest } from 'src/app/shared/data-access/models/pagination';

@Component({
  selector: 'app-user-vote-list',
  templateUrl: './user-vote-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserVoteListComponent implements OnChanges {
  @Input() username!: string;

  votes$ = this.voteComponentStore.votes$;

  constructor(private voteComponentStore: VoteComponentStore) {}

  ngOnChanges() {
    const username = this.username;
    this.voteComponentStore.getPollsVotedBy({ username });
  }

  onPaginationChange(pageRequest: PageRequest) {
    const username = this.username;
    this.voteComponentStore.getPollsVotedBy({ username, pageRequest });
  }
}
