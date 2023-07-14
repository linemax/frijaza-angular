import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
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

  uploadImage(event: any) {
    if (event.target.files[0]) {
      let form = new FormData()
      form.append('photo', event.target.files[0])
      this.http.post<any>(
        this.base.base_uri_api + 'posts/' + this.post?.id + '/photo',
        form,
        { observe: "response", withCredentials: true }).subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.ok) {
              this.snack.open('upload complete', '', { duration: 5000 })
            }
          }
        })
    }
  }
}
