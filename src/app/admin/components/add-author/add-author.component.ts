import { HttpParams, HttpResponse, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersResponse } from 'src/app/Interfaces/User';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent {


  newAuthorFormGroup = new FormGroup({
    fname: new FormControl(''),
    user: new FormControl(''),
  })

  users: UsersResponse | undefined | null;

  getUsers() {
    this.http.get(this.base.base_uri_api + 'users', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', '-1') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.users = response.body
      }
    })
  }

  constructor(private router: Router, private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.getUsers()
  }

  submit() {
    this.newAuthorFormGroup.disable()
    this.http.post(this.base.base_uri_api + 'authors', this.newAuthorFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newAuthorFormGroup.enable()
          this.snack.open(`Author ${this.newAuthorFormGroup.controls.fname.value} succefully added!`, '', { duration: 3000 })
          this.router.navigate(['admin/authors'])
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newAuthorFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].fname) {
                this.newAuthorFormGroup.controls.fname.setErrors({ backend: errorResponse.error['errors'].fname })
              }
            }
        }
      }, complete: () => {
        this.newAuthorFormGroup.enable()
      }
    })
  }
}
