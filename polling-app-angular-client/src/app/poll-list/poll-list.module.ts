import { PollEffects } from './store/polls.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PollListFacade } from './store/poll-list.facade';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from '../shared/shared.module';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { PollListItemComponent } from './components/poll-list-item/poll-list-item.component';
import { PollListService } from './services/poll-list.service';
import { initialState, POLLS_STATE_NAME } from './store/polls.state';
import { PollsReducer } from './store/polls.reducer';

@NgModule({
  declarations: [PollListComponent, PollListItemComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(POLLS_STATE_NAME, PollsReducer, {
      initialState: initialState,
    }),
    EffectsModule.forFeature([PollEffects]),
    AvatarModule,
    SharedModule,
  ],
  providers: [PollListFacade, PollListService],
  exports: [PollListComponent, PollListItemComponent],
})
export class PollListModule {}
