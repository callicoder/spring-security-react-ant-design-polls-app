import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserProfile } from '../../data-access/modules/user-profile';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  @Input() userProfile!: UserProfile;
}
