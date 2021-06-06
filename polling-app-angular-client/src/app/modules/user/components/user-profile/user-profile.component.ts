import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserProfileInfo } from '../../../polls/models/user-profile-info';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { UserFacade } from '../../store/user.facade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChild(TabsetComponent, { static: true })
  tabSet: TabsetComponent;

  user$: Observable<UserProfileInfo>;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private userFacade: UserFacade) {}

  ngOnInit() {
    this.user$ = this.userFacade.userProfile$;
    this.sub = this.route.params.subscribe((params) => {
      let username = params['username'];
      this.userFacade.getUserProfile(username);
      if (this.tabSet) {
        this.tabSet.tabs[0].active = true;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
