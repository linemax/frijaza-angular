import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {



  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });

  isHandset: boolean;
  hide: boolean = true

  constructor(
    private base: BaseService, private http: HttpClient,
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {
    this.isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset);
    if (authService.loggedInUserModel.hasValue()) {
      this.router.navigate(['/admin'])
    } else {
      authService.loggedInUserModel.changed.subscribe({
        next: (value) => {
          if (value.added[0]) {
            this.router.navigate(['/admin'])
          }
        },
      })
    }
  }

  submit() {
    this.loginForm.disable()
    this.http.post(this.base.base_uri + 'login', this.loginForm.value, { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.authService.get()
          this.router.navigate(['/'])
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.loginForm.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].email) {
                this.loginForm.controls.email.setErrors({ backend: errorResponse.error['errors'].email })
              }
              if (errorResponse.error['errors'].password) {
                this.loginForm.controls.password.setErrors({ backend: errorResponse.error['errors'].password })
              }
              if (errorResponse.error['errors'].rememberMe) {
                this.loginForm.controls.rememberMe.setErrors({ backend: errorResponse.error['errors'].rememberMe })
              }
            }
            break;

          default:
            break;
        }

      }, complete: () => {
        this.loginForm.enable()
      }
    })
  }


}
