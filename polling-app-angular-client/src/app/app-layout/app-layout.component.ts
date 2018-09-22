import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
  <app-header></app-header>
  <div class="container">
    <app-alert></app-alert>
    <app-content>
      <ng-content></ng-content>  
    </app-content>
  </div>
`,
  styles: []
})
export class AppLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
