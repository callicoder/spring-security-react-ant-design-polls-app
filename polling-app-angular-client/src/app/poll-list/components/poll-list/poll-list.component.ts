import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PollInfo } from 'src/app/poll-list/models/poll-info';
import { PollListFacade } from '../../store/poll-list.facade';
import { PaginationInfo } from '../../store/polls.state';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss'],
})
export class PollListComponent implements OnInit {
  polls$: Observable<PollInfo[]>;
  pagination$: Observable<PaginationInfo>;
  pageSize = new BehaviorSubject<number>(30);

  constructor(private pollFacade: PollListFacade) {}

  ngOnInit(): void {
    this.polls$ = this.pollFacade.polls$;
    this.pagination$ = this.pollFacade.pagination$.pipe(
      tap((paginationResult) => this.pageSize.next(paginationResult.size))
    );
    this.pollFacade.getList(0, this.pageSize.value);
  }

  paginationChange(page: number) {
    this.pollFacade.getList(page, this.pageSize.value);
  }
}
