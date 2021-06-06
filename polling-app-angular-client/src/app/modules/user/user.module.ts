import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from '../../shared/shared.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserPollListComponent } from './components/user-poll-list/user-poll-list.component';
import { UserVoteListComponent } from './components/user-vote-list/user-vote-list.component';
import { PollsModule } from '../polls/polls.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserInfoComponent,
    UserPollListComponent,
    UserVoteListComponent,
  ],
  imports: [UserRoutingModule, AvatarModule, SharedModule, PollsModule],
})
export class UserModule {}
