import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollListComponent } from './poll-list.component';
import { PollDetailComponentModule } from '../poll-detail/poll-detail.component.module';
import { PaginationComponentModule } from './../../../shared/ui/pagination/pagination.component.module';

@NgModule({
  imports: [CommonModule, PollDetailComponentModule, PaginationComponentModule],
  declarations: [PollListComponent],
  exports: [PollListComponent],
})
export class PollListComponentModule {}
