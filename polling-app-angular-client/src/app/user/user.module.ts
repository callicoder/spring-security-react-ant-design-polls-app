import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from '../shared/shared.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserFacade } from './store/user.facade';
import { UserPollListComponent } from './components/user-poll-list/user-poll-list.component';
import { UserVoteListComponent } from './components/user-vote-list/user-vote-list.component';
import { PollListModule } from '../poll-list/poll-list.module';

const routes: Routes = [
  { path: 'users/:username', component: UserProfileComponent },
];

@NgModule({
  declarations: [
    UserProfileComponent,
    UserInfoComponent,
    UserPollListComponent,
    UserVoteListComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    AvatarModule,
    SharedModule,
    PollListModule,
  ],
  providers: [UserFacade, UserService],
})
export class UserModule {}
