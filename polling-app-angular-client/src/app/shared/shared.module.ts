import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyNgxBootstrapModule } from './modules/my-ngx-bootstrap.module';
import { MyBootstrapIconsModule } from './modules/my-bootstrap-icons.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MyNgxBootstrapModule,
    MyBootstrapIconsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MyNgxBootstrapModule,
    MyBootstrapIconsModule,
  ],
})
export class SharedModule {}
