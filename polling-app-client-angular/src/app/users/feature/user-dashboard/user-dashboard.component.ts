import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserComponentStore } from '../../data-access/user.component.store';

@Component({
  selector: 'app-user',
  templateUrl: './user-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent implements OnInit {
  userProfile$ = this.userComponentStore.userProfile$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userComponentStore: UserComponentStore
  ) {}

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.params['username'];
    this.userComponentStore.getUserProfile(username);
  }
}
