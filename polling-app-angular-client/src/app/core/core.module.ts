import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import.guard';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from './../shared/shared.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponentComponent } from './components/page-not-found/page-not-found-component.component';
import { AuthTokenInterceptor } from '../auth/interceptors/auth-token.interceptor';
import { ErrorInterceptor } from '../auth/interceptors/error.interceptor';

@NgModule({
  declarations: [NavbarComponent, PageNotFoundComponentComponent],
  imports: [HttpClientModule, SharedModule],
  exports: [AuthModule, SharedModule, NavbarComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
