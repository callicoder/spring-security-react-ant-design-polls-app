# PollingAppAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

Installing bootstrap and ngx-bootstrap: `ng add ngx-bootstrap`

Import bootstrap css in src/styles.css:

`@import '~bootstrap/dist/css/bootstrap.min.css';`

Installing open iconic: `yarn add open-iconic`

Import icon set in src/styles.css:

`@import '~open-iconic/font/css/open-iconic-bootstrap.min.css';`

Install ngx-toastr: `yarn add ngx-toastr`

Import ngx-toastr css in src/style/css:

`@import '~ngx-toastr/toastr.css';`

Install ng2-avatar: `yarn add ng2-avatar`

Configure proxy to talk to backend server:
1. create file `proxy.conf.json` in the app root directory
2. add the following code:
```
{
  "/api": {
    "target": "http://localhost:5000",
    "secure": false
  }
}
```
...where target url is the url for the backend server

3. update `angular.json` by adding `"proxyConfig": "./proxy.conf.json"` to the `serve.options`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
