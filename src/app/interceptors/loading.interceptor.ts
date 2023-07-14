import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loadingService = this.injector.get(LoadingService);
    loadingService.show();
    return next.handle(request).pipe(
      finalize(() => loadingService.hide())
    );
  }
}

export function loadingServiceFactory() {
  return new LoadingService();
}
