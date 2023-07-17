import { HttpClient, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostsResponse, Post } from 'src/app/Interfaces/post';
import { BaseService } from 'src/app/services/base.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  refresh() {
    this.getPosts(this.base.base_uri_api + 'posts')
  }

  pageEevent: PageEvent = new PageEvent()

  displayedColumns: string[] = ['title', 'author', 'categories', 'updated', 'created'];

  paginate($event: PageEvent) {
    this.getPosts(this.base.base_uri_api + `authors?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }
  posts: PostsResponse | undefined | null
  error: string | undefined | null

  constructor(private dialog: MatDialog, private base: BaseService, private snackBar: MatSnackBar, private http: HttpClient) {
    this.getPosts(this.base.base_uri_api + 'posts')

  }

  delete(_t67: Post) {

    this.snackBar.open(`Confirm ${_t67.title} Post Deletion`, 'CONFIRM', { duration: 7000 }).onAction().subscribe(() => {
      this.http.delete(this.base.base_uri_api + `posts/${_t67.id}`, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          this.snackBar.open(`Post ${_t67.title} deleted.`, 'Close', { duration: 3000 })
        }
      })
    })
  }


  getPosts(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'categories, author, photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.posts = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })

  }

}
