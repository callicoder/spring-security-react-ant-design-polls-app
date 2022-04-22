import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertModule } from '@full-fledged/alerts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundPageModule } from './shared/ui/page-not-found/page-not-found.page.module';
import { HttpAuthorizationInterceptor } from './shared/utils/interceptors/http-authorization.interceptor';
import { NavbarComponentModule } from './shared/ui/navbar/navbar.component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertModule.forRoot({
      maxMessages: 5,
      timeout: 3000,
      positionX: 'right',
      positionY: 'top',
    }),
    AppRoutingModule,
    PageNotFoundPageModule,
    NavbarComponentModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthorizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
