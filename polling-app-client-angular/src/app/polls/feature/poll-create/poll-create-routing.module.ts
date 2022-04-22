import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollCreateComponent } from './poll-create.component';

const routes: Routes = [
  {
    path: 'new',
    component: PollCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollCreateComponentRoutingModule {}
