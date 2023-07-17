import { HttpParams, HttpResponse, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { UsersResponse } from 'src/app/Interfaces/User';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent implements OnInit, OnDestroy {
  editor: Editor | undefined | null;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    if (this.editor)
      this.editor.destroy();
  }

  newAuthorFormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    bio: new FormControl(''),
    user: new FormControl(''),
    editorContent: new FormControl('', Validators.required())
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
          this.snack.open(`Author ${this.newAuthorFormGroup.controls.name.value} succefully added!`, '', { duration: 3000 })
          this.router.navigate(['admin/authors'])
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newAuthorFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].name) {
                this.newAuthorFormGroup.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
              }
              if (errorResponse.error['errors'].phone) {
                this.newAuthorFormGroup.controls.phone.setErrors({ backend: errorResponse.error['errors'].phone })
              }
              if (errorResponse.error['errors'].email) {
                this.newAuthorFormGroup.controls.email.setErrors({ backend: errorResponse.error['errors'].email })
              }
              if (errorResponse.error['errors'].bio) {
                this.newAuthorFormGroup.controls.bio.setErrors({ backend: errorResponse.error['errors'].bio })
              }
            }
        }
      }, complete: () => {
        this.newAuthorFormGroup.enable()
      }
    })
  }
}
