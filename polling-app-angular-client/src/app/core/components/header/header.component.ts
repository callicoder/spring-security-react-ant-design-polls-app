import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { AuthFacade } from 'src/app/store/facades/auth.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserInfo>;
  isLoggedIn$: Observable<boolean>;

  isCollapsed = true;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.user$ = this.authFacade.user$;
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;
  }

  logout() {
    this.authFacade.logout();
  }
}
