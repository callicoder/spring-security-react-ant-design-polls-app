import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
