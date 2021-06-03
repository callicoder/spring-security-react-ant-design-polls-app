import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacade } from 'src/app/auth/store/auth.facade';
import { UserInfo } from 'src/app/auth/store/auth.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {
  user$: Observable<UserInfo>;
  isLoggedIn$: Observable<boolean>;

  isCollapsed = true;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.user$ = this.authFacade.currentUser$;
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;
    this.authFacade.isAuthenticated();
  }

  logout() {
    this.authFacade.logout();
  }
}
