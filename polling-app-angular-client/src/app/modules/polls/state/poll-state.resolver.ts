import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { PollFacade } from './poll-facade';

@Injectable({
  providedIn: 'root',
})
export class PollStateResolver implements Resolve<any> {
  constructor(private pollFacade: PollFacade) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.pollFacade.loadPolls();
    return of('NONE');
  }
}
