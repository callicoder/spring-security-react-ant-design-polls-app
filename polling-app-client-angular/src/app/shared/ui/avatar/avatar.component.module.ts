import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
})
export class AvatarComponentModule {}
