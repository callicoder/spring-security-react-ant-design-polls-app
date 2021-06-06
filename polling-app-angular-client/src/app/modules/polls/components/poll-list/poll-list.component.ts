import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PollFacade } from '../../state/poll-facade';
import { PollsViewModel } from '../../state/poll.selectors';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss'],
})
export class PollListComponent implements OnInit {
  vm$: Observable<PollsViewModel>;

  constructor(private pollFacade: PollFacade) {}

  ngOnInit(): void {
    // this.pollFacade.loadPolls();
    this.vm$ = this.pollFacade.vm$;
  }

  onPaginationChange({ page, size }) {
    this.pollFacade.loadPolls(page, size);
  }
}
