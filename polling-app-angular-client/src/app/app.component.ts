import { Component, OnInit } from '@angular/core';
import { AuthFacade } from './store/facades/auth.facade';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.authFacade.browserReload();
  }
}
