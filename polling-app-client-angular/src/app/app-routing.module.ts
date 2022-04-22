import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundPage } from './shared/ui/page-not-found/page-not-found.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./polls/feature/poll-shell/poll-shell.module').then(
        (m) => m.PollShellModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./users/feature/user-shell/user-shell.module').then(
        (m) => m.UserShellModule
      ),
  },
  { path: '**', component: PageNotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
