import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/polls', pathMatch: 'full' },
  { path: 'polls', loadChildren: () => import('./app-polling/app-polling.module').then(m => m.AppPollingModule) },
  { path: 'user', loadChildren: () => import('./app-user/app-user.module').then(m => m.AppUserModule) },
  { path: '**', redirectTo: '/polls' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
