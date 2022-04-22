import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundPage } from './page-not-found.page';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PageNotFoundPage],
  exports: [PageNotFoundPage],
})
export class PageNotFoundPageModule {}
