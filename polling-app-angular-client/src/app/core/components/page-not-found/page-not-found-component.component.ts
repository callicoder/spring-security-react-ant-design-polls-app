import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found-component',
  template: `
    <div class="d-flex justify-content-center">
      <div class="card border-secondary mb-3">
        <div class="card-header"><h1>404</h1></div>
        <div class="card-body">
          <h4 class="card-title mb-3">
            The Page you're looking for was not found.
          </h4>
          <p class="card-text d-flex justify-content-center">
            <button type="button" class="btn btn-primary" [routerLink]="['/']">
              Go Back
            </button>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class PageNotFoundComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
