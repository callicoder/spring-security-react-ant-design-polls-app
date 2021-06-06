import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollAddComponent } from './components/poll-add/poll-add.component';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { PollStateResolver } from './state/poll-state.resolver';

const routes: Routes = [
  {
    path: '',
    component: PollListComponent,
    resolve: { state: PollStateResolver },
  },
  { path: 'new', component: PollAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollsRoutingModule {}
