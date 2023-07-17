import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AuthorsResponse } from 'src/app/Interfaces/author';
import { Post } from 'src/app/Interfaces/post';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {

  update(arg0: Post) {
    this.dialog.open(EditPostComponent, {
      width: '100',
      hasBackdrop: true,
      data: this.post
    })
  }

  post: Post | undefined
  author: AuthorsResponse | undefined
  category: TopicsResponse | undefined
  error: string | undefined

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
          this.category = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })
  }



  uploadProgress: number | undefined | null;
  uploadSub: Subscription | undefined | null;

  uploadImage(event: any) {
    if (event.target.files[0]) {
      let form = new FormData()
      form.append('photo', event.target.files[0])
      const upload$ = this.http.post<any>(
        this.base.base_uri_api + 'posts/' + this.post?.id + '/photo',
        form,
        { observe: "response", withCredentials: true, reportProgress: true }).subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.ok) {
              if (event.type == HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
              }
              this.snack.open('upload complete', '', { duration: 5000 })
            }
          }
        })
    }
  }


  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
