import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';

import { AuthEffects } from './store/auth.effects';
import { AuthReducer } from './store/auth.reducer';
import { authInitialState, AUTH_STATE_NAME } from './store/auth.state';
import { AuthFacade } from './store/auth.facade';

import { AuthService } from './services/auth.service';
import { LocalStorageJwtService } from './services/local-storage-jwt.service';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer, {
      initialState: authInitialState,
    }),
    EffectsModule.forFeature([AuthEffects]),
    SharedModule,
    UserModule,
  ],
  providers: [AuthFacade, AuthService, LocalStorageJwtService],
})
export class AuthModule {}
