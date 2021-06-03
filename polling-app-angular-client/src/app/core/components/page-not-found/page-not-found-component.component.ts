import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found-component',
  template: `
    <h1>This is not the page you were looking for!</h1>
  `
})
export class PageNotFoundComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
