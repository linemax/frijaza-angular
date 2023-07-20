import { HttpParams, HttpResponse, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { AuthorsResponse } from 'src/app/Interfaces/author';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit, OnDestroy {
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

  newPosFormGroup = new FormGroup({
    title: new FormControl(''),
    introduction: new FormControl(''),
    body: new FormControl(''),
    read_time: new FormControl(''),
    author_id: new FormControl(''),
    categories: new FormControl(''),
    publish: new FormControl(false),
    editorContent: new FormControl('', Validators.required()
    ),
  })

  topics: TopicsResponse | undefined | null;
  authors: AuthorsResponse | undefined | null;

  getTopics() {
    this.http.get(this.base.base_uri_api + 'categories', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', '-1') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.topics = response.body
      }
    })
  }

  getAuthors() {
    this.http.get(this.base.base_uri_api + 'authors', { observe: 'response', withCredentials: true, params: new HttpParams().append('size', '-1') }).subscribe({
      next: (response: HttpResponse<any>) => {
        this.authors = response.body
      }
    })
  }

  constructor(private router: Router, private snack: MatSnackBar, private base: BaseService, private http: HttpClient) {
    this.getAuthors()
    this.getTopics()
  }

  submit() {
    this.newPosFormGroup.disable()

    const postData = { ...this.newPosFormGroup.value };
    postData.publish = postData.publish ? false : true;
    this.http.post(this.base.base_uri_api + 'posts', postData, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.newPosFormGroup.enable()
          this.snack.open(`Post ${this.newPosFormGroup.controls.title.value} succefully added!`, '', { duration: 3000 })
          this.router.navigate(['admin/articles'])
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.newPosFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].title) {
                this.newPosFormGroup.controls.title.setErrors({ backend: errorResponse.error['errors'].title })
              }
              if (errorResponse.error['errors'].introduction) {
                this.newPosFormGroup.controls.introduction.setErrors({ backend: errorResponse.error['errors'].introduction })
              }
              if (errorResponse.error['errors'].read_time) {
                this.newPosFormGroup.controls.read_time.setErrors({ backend: errorResponse.error['errors'].read_time })
              }
              if (errorResponse.error['errors'].body) {
                this.newPosFormGroup.controls.body.setErrors({ backend: errorResponse.error['errors'].body })
              }
            }
        }
      }, complete: () => {
        this.newPosFormGroup.enable()
      }
    })
  }
}
