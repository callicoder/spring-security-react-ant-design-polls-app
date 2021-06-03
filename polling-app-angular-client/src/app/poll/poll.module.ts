import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from '../shared/shared.module';

import { PollComponent } from './components/poll/poll.component';
// import { PollsReducer } from 'src/app/core/store/polls/polls.reducer';
// import { POLLS_STATE_NAME } from 'src/app/core/store/polls/polls.selector';
import { PollFacade } from './store/poll.facade';
import { PollService } from './services/poll.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PollComponent },
];
@NgModule({
  declarations: [PollComponent],
  imports: [
    RouterModule.forChild(routes),
    AvatarModule,
    SharedModule,
    // StoreModule.forFeature(POLLS_STATE_NAME, PollsReducer),
  ],
  providers: [PollFacade, PollService],
})
export class PollModule {}
