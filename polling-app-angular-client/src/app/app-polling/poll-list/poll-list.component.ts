import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { PollService } from '../services/polling.service';
import { PollInfo } from './../models/poll-info';

@Component({
  selector: 'app-poll-list',
  template: `
  <div class="polls-container" *ngIf="polls?.length > 0; else templateForEmpty">
     <ng-container>
      <poll-view *ngFor="let poll of polls" [poll]='poll'></poll-view>
    </ng-container>
  </div>
  <ng-template #templateForEmpty>
    <div class="polls-container no-polls-found">
      <span>No Polls Found.</span>
    </div>
  </ng-template>
  `,
  styles: [`
  .polls-container {
    max-width: 600px;
    margin: 0 auto;    
    margin-top: 20px; 
}
  .no-polls-found {
    font-size: 20px;
    text-align: center;
    padding: 20px;    
  }
  `]
})
export class PollListComponent implements OnInit, OnChanges {

  @Input() public username: string;
  @Input() public type: string;
  polls: PollInfo[];

  constructor(
    private pollService: PollService,
    private toastr: ToastrService 
  ) { }

  ngOnInit() {
    this.loadingPolls();
  }

  ngOnChanges(changes) {
    if (changes.username) {
      this.loadingPolls();
    }
  }

  private loadingPolls() {
    if (this.type === 'USER_CREATED_POLLS') {
      this.loadUserCreatedPolls(this.username, 0, 30);
    } else if (this.type === 'USER_VOTED_POLLS') {
      this.loadUserVotedPolls(this.username, 0, 30);
    } else {
      this.loadAllPolls(0, 30);
    }
  }

  private loadAllPolls(page: number, size: number) {
    this.pollService.getAllPolls(page, size)
      .pipe(first())
      .subscribe(res => {
        this.polls = res.content;
      },
      error => {
        this.toastr.error(error, "Polling App");
      });
  }

  private loadUserCreatedPolls(username: string, page: number, size: number) {
    this.pollService.getUserCreatedPolls(username, page, size)
      .pipe(first())
      .subscribe(res => {
        this.polls = res.content;
      },
      error => {
        this.toastr.error(error, "Polling App");
      });
  }

  private loadUserVotedPolls(username: string, page: number, size: number) {
    this.pollService.getUserVotedPolls(username, page, size)
      .pipe(first())
      .subscribe(res => {
        this.polls = res.content;
      },
      error => {
        this.toastr.error(error, "Polling App");
      });
  }

}
