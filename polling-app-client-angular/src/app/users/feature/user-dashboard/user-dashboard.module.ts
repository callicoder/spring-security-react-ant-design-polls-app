import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDetailModule } from '../../ui/user-detail/user-detail.component.module';
import { UserPollListModule } from './../user-poll-list/user-poll-list.module';
import { UserVoteListModule } from './../user-vote-list/user-vote-list.module';

@NgModule({
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    UserDetailModule,
    UserPollListModule,
    UserVoteListModule,
  ],
  declarations: [UserDashboardComponent],
})
export class UserDashboardModule {}
