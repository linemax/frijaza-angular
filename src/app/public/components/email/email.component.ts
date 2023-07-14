import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
close() {
  this.bottomSheet.dismiss()
}
  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient, private bottomSheet: MatBottomSheet) { }

  subscribe = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    subject: new FormControl(''),
    body: new FormControl(''),
  })

  submit() {
    if (this.subscribe.valid) {
      this.subscribe.disable()
      
      this.http.post(this.base.base_uri_api + 'subscribe', this.subscribe.value, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.snack.open('Query Submitted', '', {duration: 5000})
          }
        }, error: (errorResponse: HttpErrorResponse) => {
          this.subscribe.enable()
          switch (errorResponse.status) {
            case 422:
              if (errorResponse.error['errors']) {
                if (errorResponse.error['errors'].email) {
                  this.subscribe.controls.email.setErrors({ backend: errorResponse.error['errors'].email })
                }
                if (errorResponse.error['errors'].name) {
                  this.subscribe.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
                }
                if (errorResponse.error['errors'].subject) {
                  this.subscribe.controls.subject.setErrors({ backend: errorResponse.error['errors'].subject })
                }
                if (errorResponse.error['errors'].body) {
                  this.subscribe.controls.body.setErrors({ backend: errorResponse.error['errors'].body })
                }
              }
              break;

            default:
              break;
          }

        }, complete: () => {
          this.subscribe.enable()
        }
      })
    }
  }
}
