import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppBootstrapModule } from './../app-bootstrap/app-bootstrap.module';
import { AppAlertModule } from '../app-alert/app-alert.module';

import { AppLayoutComponent } from './app-layout.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppContentComponent } from './app-content.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AppBootstrapModule,
    AppAlertModule
  ],
  declarations: [AppLayoutComponent, AppHeaderComponent, AppContentComponent],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
