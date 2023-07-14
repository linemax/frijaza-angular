import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {


  newTopicGroup = new FormGroup({
    name: new FormControl(''),
  })

  topic: TopicsResponse | undefined | null;


  constructor(private snack: MatSnackBar, private base: BaseService, private http: HttpClient, private router: Router) {
  }

  submit() {
    this.newTopicGroup.disable()
    this.http.post(this.base.base_uri_api + 'categories', this.newTopicGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newTopicGroup.enable()
          this.snack.open(`${this.newTopicGroup.controls.name.value} succefully added!`, '', { duration: 3000 })

        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newTopicGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].name) {
                this.newTopicGroup.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
              }
            }
        }
      }, complete: () => {
        this.newTopicGroup.enable()
      }
    })
  }
}
