import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthorsResponse } from 'src/app/Interfaces/author';
import { Post } from 'src/app/Interfaces/post';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent {
  post: Post | undefined
  author: AuthorsResponse | undefined
  category: TopicsResponse | undefined
  error: string | undefined
  isLoading: boolean = false;

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
        if (post) {
          this.post = post
          this.isLoading = false

        } else {

          this.isLoading = true
        }
        this.isLoading = false
      });
    this.getAuthor(this.base.base_uri_api + 'authors')
    this.getcategory(this.base.base_uri_api + 'categories')
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  getAuthor(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'posts, user, posts.photo') }).subscribe({
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
    this.isLoading = true
    this.http.get(url, { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'posts, posts.photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.category = response.body
        }
        this.isLoading = false
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
        this.isLoading = true
      }
    })
  }
}
