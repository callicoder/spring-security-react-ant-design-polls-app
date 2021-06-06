import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { throwIfAlreadyLoaded } from './module-import.guard';
import { AuthModule } from '../modules/auth/auth.module';
import { SharedModule } from './../shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponentComponent } from './components/page-not-found/page-not-found-component.component';
import { AuthTokenInterceptor } from '../modules/auth/interceptors/auth-token.interceptor';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponentComponent],
  imports: [HttpClientModule, SharedModule, AuthModule],
  exports: [SharedModule, HeaderComponent],
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
