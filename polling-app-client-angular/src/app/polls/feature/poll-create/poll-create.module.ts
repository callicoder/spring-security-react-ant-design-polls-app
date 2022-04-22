import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PollCreateComponentRoutingModule } from './poll-create-routing.module';
import { PollCreateComponent } from './poll-create.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PollCreateComponentRoutingModule,
  ],
  declarations: [PollCreateComponent],
})
export class PollCreateComponentModule {}
