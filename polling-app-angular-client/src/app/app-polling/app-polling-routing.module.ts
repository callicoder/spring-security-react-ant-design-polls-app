import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollListComponent } from './poll-list/poll-list.component';
import { PollNewComponent } from './poll-new/poll-new.component';


const routes: Routes = [
  { path: '', component: PollListComponent },
  { path: 'new', component: PollNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPollingRoutingModule { }