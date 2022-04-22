import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollDashboardComponent } from './poll-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PollDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollDashboardComponentRoutingModule {}
