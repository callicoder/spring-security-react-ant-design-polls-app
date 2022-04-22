import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserVoteListComponent } from './user-vote-list.component';
import { PollListComponentModule } from 'src/app/polls/ui/poll-list/poll-list.component.module';

@NgModule({
  imports: [CommonModule, PollListComponentModule],
  declarations: [UserVoteListComponent],
  exports: [UserVoteListComponent],
})
export class UserVoteListModule {}
