import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
})
export class PaginationComponentModule {}
