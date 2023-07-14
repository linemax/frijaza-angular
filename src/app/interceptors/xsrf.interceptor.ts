import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.headers.has('X-XSRF-TOKEN')) {
      const token = this.getToken()
      if (token) {
        const authReq = req.clone({
          headers: req.headers.set('X-XSRF-TOKEN', `${token}`)
        });
        return next.handle(authReq);

      }
    }
    return next.handle(req);
  }

  getToken() {
    let cookie_string = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]
    return cookie_string ? cookie_string : '';
  }
}