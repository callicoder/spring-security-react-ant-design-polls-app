import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPollListComponent } from './user-poll-list.component';
import { PollListComponentModule } from 'src/app/polls/ui/poll-list/poll-list.component.module';

@NgModule({
  imports: [CommonModule, PollListComponentModule],
  declarations: [UserPollListComponent],
  exports: [UserPollListComponent],
})
export class UserPollListModule {}
