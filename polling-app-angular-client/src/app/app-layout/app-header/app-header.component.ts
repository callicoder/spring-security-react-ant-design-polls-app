import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../app-auth/services/auth.service';
import { UserInfo } from '../../app-auth/models/user-info';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styles: []
})
export class AppHeaderComponent implements OnInit {

  private currentUser: UserInfo;
  isCollapsed = true;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user: UserInfo) => {
      this.currentUser = user;
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.toastr.success("You're successfully logged out.", "Polling App");
    this.router.navigate(['login']);
  }

  get userInfo() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      return new UserInfo();
    }
    return currentUser;
  }

}
