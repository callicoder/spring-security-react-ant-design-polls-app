import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PollDetailComponent } from './poll-detail.component';
import { AvatarComponentModule } from 'src/app/shared/ui/avatar/avatar.component.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AvatarComponentModule,
  ],
  declarations: [PollDetailComponent],
  exports: [PollDetailComponent],
})
export class PollDetailComponentModule {}
