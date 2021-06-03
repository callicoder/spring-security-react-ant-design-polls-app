import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageJwtService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token: string;
    this.localStorage.getItem().subscribe((t) => (token = t));
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
