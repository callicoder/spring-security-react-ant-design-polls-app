import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SignupRoutingModule],
  declarations: [SignupComponent],
})
export class SignupModule {}
