import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedRoutes: string[] = ["login"];

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const currentUrl = this.router.url;
          if (!this.isExcludedRoute(currentUrl)) {
            this.handleUnauthorizedError();
          }
        }
        throw error;
      })
    );
  }

  private handleUnauthorizedError(): void {
    // Redirect to the login page or any other appropriate route
    this.router.navigate(["login"]);
  }

  private isExcludedRoute(url: string): boolean {
    return this.excludedRoutes.some(route => url.startsWith(route));
  }
}