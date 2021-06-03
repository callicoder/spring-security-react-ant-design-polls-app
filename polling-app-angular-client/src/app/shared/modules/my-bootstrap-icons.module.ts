import { NgModule } from '@angular/core';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import {
  checkCircle,
  house,
  lock,
  person,
  plus,
  uiRadios,
  x,
} from 'ngx-bootstrap-icons';

const icons = {
  checkCircle,
  house,
  lock,
  person,
  plus,
  uiRadios,
  x,
};

@NgModule({
  declarations: [],
  imports: [NgxBootstrapIconsModule.pick(icons)],
  exports: [NgxBootstrapIconsModule],
})
export class MyBootstrapIconsModule {}
