import { NgModule } from '@angular/core';
import { PollsRoutingModule } from './polls-routing.module';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from 'src/app/shared/shared.module';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { PollItemComponent } from './components/poll-item/poll-item.component';
import { StoreModule } from '@ngrx/store';
import * as fromPoll from './state/poll.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PollEffects } from './state/poll.effects';
import { PollAddComponent } from './components/poll-add/poll-add.component';

@NgModule({
  declarations: [PollListComponent, PollItemComponent, PollAddComponent],
  imports: [
    PollsRoutingModule,
    AvatarModule,
    SharedModule,
    StoreModule.forFeature(fromPoll.pollsFeatureKey, fromPoll.reducer),
    EffectsModule.forFeature([PollEffects]),
  ],
  exports: [PollItemComponent],
})
export class PollsModule {}
