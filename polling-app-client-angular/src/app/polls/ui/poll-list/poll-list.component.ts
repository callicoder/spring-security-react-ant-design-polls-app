import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  PageRequest,
  PaginatedResult,
} from 'src/app/shared/data-access/models/pagination';
import { PollResponse } from '../../data-access/models/poll-response';
import { VoteRequest } from '../../data-access/models/vote-request';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollListComponent {
  @Input() polls!: PaginatedResult<PollResponse[]>;
  @Output() selectedPagination: EventEmitter<PageRequest> = new EventEmitter();
  @Output() vote: EventEmitter<VoteRequest> = new EventEmitter();

  constructor() {}

  onPaginationChange(pageRequest: PageRequest) {
    this.selectedPagination.emit(pageRequest);
  }

  onVote(voteRequest: VoteRequest) {
    this.vote.emit(voteRequest);
  }
}
