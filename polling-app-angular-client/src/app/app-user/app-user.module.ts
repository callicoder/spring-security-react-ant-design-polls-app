import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AvatarModule } from 'ng2-avatar';

import { AppBootstrapModule } from './../app-bootstrap/app-bootstrap.module';
import { AppPollingModule } from '../app-polling/app-polling.module';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    AvatarModule,
    AppBootstrapModule,
    AppPollingModule
  ],
  declarations: [LoginComponent, ProfileComponent, SignupComponent]
})
export class AppUserModule { }
