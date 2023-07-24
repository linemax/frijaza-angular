import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthorsResponse } from 'src/app/Interfaces/author';
import { Post } from 'src/app/Interfaces/post';
import { Topic, TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
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


  submit() {
    this.editPostFormGroup.disable()

    const postData = { ...this.editPostFormGroup.value };
    postData.publish = postData.publish ? false : true;
    this.http.post(this.base.base_uri_api + 'posts', postData, { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.editPostFormGroup.enable()
          this.snack.open(`Post ${this.editPostFormGroup.controls.title.value} succefully edited!`, '', { duration: 3000 })
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.editPostFormGroup.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].title) {
                this.editPostFormGroup.controls.title.setErrors({ backend: errorResponse.error['errors'].title })
              }
              if (errorResponse.error['errors'].introduction) {
                this.editPostFormGroup.controls.introduction.setErrors({ backend: errorResponse.error['errors'].introduction })
              }
              if (errorResponse.error['errors'].read_time) {
                this.editPostFormGroup.controls.read_time.setErrors({ backend: errorResponse.error['errors'].read_time })
              }
              if (errorResponse.error['errors'].body) {
                this.editPostFormGroup.controls.body.setErrors({ backend: errorResponse.error['errors'].body })
              }
            }
        }
      }, complete: () => {
        this.editPostFormGroup.enable()
      }
    })
  }

  update(arg0: Post) {
    this.dialog.open(EditPostComponent, {
      width: '100',
      hasBackdrop: true,
      data: this.post
    })
  }

  post: Post | undefined
  author: AuthorsResponse | undefined
  categories: TopicsResponse | undefined
  error: string | undefined

  editPostFormGroup = new FormGroup({
    title: new FormControl(''),
    introduction: new FormControl(''),
    body: new FormControl(''),
    read_time: new FormControl(''),
    author_id: new FormControl(),
    categories: new FormControl(),
    publish: new FormControl(false),
    editorContent: new FormControl('', Validators.required()
    ),
  })



  constructor(
    private activateRoute: ActivatedRoute,
    public base: BaseService,
    private http: HttpClient,
    private snack: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public sanitizer: DomSanitizer

  ) {
    this.activateRoute.data.subscribe(
      ({ post }) => {
        this.post = post
        if (this.post) {
          this.editPostFormGroup.controls.title.setValue(this.post.title)
          this.editPostFormGroup.controls.introduction.setValue(this.post.introduction)
          this.editPostFormGroup.controls.body.setValue(this.post.body)
          this.editPostFormGroup.controls.read_time.setValue(this.post.read_time)
          this.editPostFormGroup.controls.author_id.setValue(this.post.author.id)
          this.editPostFormGroup.controls.categories.setValue(this.post?.categories.map((value) => value.id))
        }
      });
    this.getAuthor(this.base.base_uri_api + 'authors')
    this.getcategory(this.base.base_uri_api + 'categories')
  }



  getAuthor(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'posts, user, photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.author = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })
  }



  getcategory(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'posts') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.categories = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })
  }



  // uploadImage(event: any) {
  //   if (event.target.files[0]) {
  //     let form = new FormData()
  //     form.append('photo', event.target.files[0])
  //     const upload$ = this.http.post<any>(
  //       this.base.base_uri_api + 'posts/' + this.post?.id + '/photo',
  //       form,
  //       { observe: "response", withCredentials: true, reportProgress: true }).subscribe({
  //         next: (response: HttpResponse<any>) => {
  //           if (response.ok) {
  //             if (event.type == HttpEventType.UploadProgress) {
  //               this.uploadProgress = Math.round(100 * (event.loaded / event.total));
  //             }else if (event.type == HttpEventType.Response){

  //             this.snack.open('upload complete', '', { duration: 5000 })
  //             }
  //           }
  //         }
  //       })
  //   }
  // }


  // cancelUpload() {
  //   this.uploadSub?.unsubscribe();
  //   this.reset();
  // }

  // reset() {
  //   this.uploadProgress = null;
  //   this.uploadSub = null;
  // }

  uploadComplete: boolean = false
  uploadProgress= 0

  uploadImage(event: any) {
    if (event.target.files[0]) {
      let form = new FormData();
      form.append('photo', event.target.files[0]);
      const upload$ = this.http.post<any>(
        this.base.base_uri_api + 'posts/' + this.post?.id + '/photo',
        form,
        { observe: 'events', withCredentials: true, reportProgress: true }
      ).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          } else if (event.type === HttpEventType.Response) {
            if (event.ok) {
              this.uploadComplete = true;
              this.snack.open('Upload complete', '', { duration: 5000 });
              // Call a function to refresh the page after successful upload
              this.refreshPage();
            } else {
              this.uploadComplete = false;
              this.snack.open('Upload failed', '', { duration: 5000 });
            }
          }
        },
        error: (error: any) => {
          this.uploadComplete = false;
          this.snack.open('Upload failed', '', { duration: 5000 });
        }
      });
    }
  }

  refreshPage() {
    this.getPostDetails()
  }

  private getPostDetails() {
    return this.http.get<Post>(this.base.base_uri_api + 'posts/' + this.post?.id);
  }

}
