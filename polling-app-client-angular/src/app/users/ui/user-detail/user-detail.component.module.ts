import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './user-detail.component';
import { AvatarComponentModule } from 'src/app/shared/ui/avatar/avatar.component.module';

@NgModule({
  imports: [CommonModule, AvatarComponentModule],
  declarations: [UserDetailComponent],
  exports: [UserDetailComponent],
})
export class UserDetailModule {}
