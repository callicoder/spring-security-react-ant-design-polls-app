import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppAuthModule } from './app-auth/app-auth.module';
import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
import { AppPollingModule } from './app-polling/app-polling.module';
import { AppUserModule } from './app-user/app-user.module';
import { AppAlertModule } from './app-alert/app-alert.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AppAuthModule,
    AppBootstrapModule,
    AppPollingModule,
    AppUserModule,
    AppAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
