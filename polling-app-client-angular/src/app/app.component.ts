import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserComponentStore } from './users/data-access/user.component.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  userProfile$ = this.userComponentStore.userProfile$;

  constructor(private userComponentStore: UserComponentStore) {}

  ngOnInit() {
    // Reload current user when browser is refreshed.
    this.userComponentStore.loadCurrentUser();
  }

  onLogOutEvent(logout: boolean) {
    if (logout) {
      this.userComponentStore.logout();
    }
  }
}
