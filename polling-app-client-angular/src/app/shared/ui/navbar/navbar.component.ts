import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UserProfile } from 'src/app/users/data-access/modules/user-profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() userProfile!: UserProfile | null;
  @Output() logoutEvent: EventEmitter<boolean> = new EventEmitter();

  logout() {
    this.logoutEvent.emit(true);
  }
}
