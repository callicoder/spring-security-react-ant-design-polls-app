import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppBootstrapModule } from './../app-bootstrap/app-bootstrap.module';
import { AppPollingRoutingModule } from './app-polling-routing.module';

import { PollComponent } from './poll/poll.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { PollNewComponent } from './poll-new/poll-new.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AvatarModule,
    FormsModule, 
    ReactiveFormsModule,
    AppBootstrapModule,
    AppPollingRoutingModule
  ],
  declarations: [PollComponent, PollListComponent, PollNewComponent],
  exports: [PollListComponent]
})
export class AppPollingModule { }
