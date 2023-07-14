import { HttpParams, HttpResponse, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthorsResponse } from 'src/app/Interfaces/author';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent {


  newServiceFormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
  })

  constructor(private router: Router, private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
     }

  submit() {
    this.newServiceFormGroup.disable()
    this.http.post(this.base.base_uri_api + 'services', this.newServiceFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newServiceFormGroup.enable()
          this.snack.open(`Post ${this.newServiceFormGroup.controls.title.value} succefully added!`, '', { duration: 3000 })
          this.router.navigate(['admin/services'])
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newServiceFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].title) {
                this.newServiceFormGroup.controls.title.setErrors({ backend: errorResponse.error['errors'].title })
              }
              if (errorResponse.error['errors'].description) {
                this.newServiceFormGroup.controls.description.setErrors({ backend: errorResponse.error['errors'].description })
              }
              if (errorResponse.error['errors'].body) {
                this.newServiceFormGroup.controls.body.setErrors({ backend: errorResponse.error['errors'].body })
              }
            }
        }
      }, complete: () => {
        this.newServiceFormGroup.enable()
      }
    })
  }

}
