import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { Post, PostsResponse } from 'src/app/Interfaces/post';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-blog-articles',
  templateUrl: './blog-articles.component.html',
  styleUrls: ['./blog-articles.component.scss']
})
export class BlogArticlesComponent {

  searchQuery: string = '';
  search(): void {
    console.log('Search query:', this.searchQuery);
  }


  subForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
  });



  topics: TopicsResponse | undefined | null
  posts: PostsResponse | undefined | null
  postInstance: Post | undefined | null

  isLoading: boolean = true
  hidePageSize = false;

  refresh() {
    this.isLoading = false
    this.getPosts(this.base.base_uri_api + 'posts')
  }

  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver, private http: HttpClient, public base: BaseService, private activateRoute: ActivatedRoute,) {
    this.activateRoute.data.subscribe(
      ({ post }) => {
        this.postInstance = post
      });
    this.getTopics(this.base.base_uri_api + 'categories')
    this.getPosts(this.base.base_uri_api + 'posts')
  }

  onscroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      this.getPosts(this.base.base_uri_api + 'posts')
    }
  }


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  pageEevent: PageEvent = new PageEvent()
  paginate($event: PageEvent) {
    this.getTopics(this.base.base_uri_api + `categories?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
    this.getPosts(this.base.base_uri_api + `posts?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }


  getTopics(url: string, pageEevent?: PageEvent) {
    this.http.get(url, { observe: 'response', params: new HttpParams().append('with', 'posts') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.topics = response.body
        }
      },
    })

  }

  getPosts(url: string, pageEevent?: PageEvent) {
    this.http.get(url, { observe: 'response', params: new HttpParams().append('with', 'category, author,author.photo, photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.posts = response.body
        }
      },
    })

  }

  submit() {
    this.subForm.disable()
    this.http.post(this.base.base_uri + 'login', this.subForm.value, { observe: 'response', withCredentials: true }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.subForm.enable()
        switch (errorResponse.status) {
          case 422:
            if (errorResponse.error['errors']) {
              if (errorResponse.error['errors'].name) {
                this.subForm.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
              }
              if (errorResponse.error['errors'].email) {
                this.subForm.controls.email.setErrors({ backend: errorResponse.error['errors'].email })
              }
            }
            break;

          default:
            break;
        }

      }, complete: () => {
        this.subForm.enable()
      }
    })
  }


}