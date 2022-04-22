import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/users/data-access/user.service';

@Injectable()
export class HttpAuthorizationInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add authorization header with jwt token if available.
    return this.userService.getTokenFromLocalStorage().pipe(
      switchMap((token) => {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(newRequest);
      })
    );
  }
}
