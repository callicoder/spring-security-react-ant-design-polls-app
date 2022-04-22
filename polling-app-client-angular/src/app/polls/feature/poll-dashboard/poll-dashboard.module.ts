import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollDashboardComponentRoutingModule } from './poll-dashboard-routing.module';
import { PollDashboardComponent } from './poll-dashboard.component';
import { PollListComponentModule } from '../../ui/poll-list/poll-list.component.module';

@NgModule({
  imports: [
    CommonModule,
    PollDashboardComponentRoutingModule,
    PollListComponentModule,
  ],
  declarations: [PollDashboardComponent],
})
export class PollDashboardComponentModule {}
