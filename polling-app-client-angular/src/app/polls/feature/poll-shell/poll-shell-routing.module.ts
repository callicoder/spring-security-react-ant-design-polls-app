import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../poll-dashboard/poll-dashboard.module').then(
        (m) => m.PollDashboardComponentModule
      ),
  },
  {
    path: 'poll',
    loadChildren: () =>
      import('../poll-create/poll-create.module').then(
        (m) => m.PollCreateComponentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollShellRoutingModule {}
