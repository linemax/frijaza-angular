import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable, map, shareReplay } from 'rxjs';
import { Post, PostsResponse } from 'src/app/Interfaces/post';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-explore-topics',
  templateUrl: './explore-topics.component.html',
  styleUrls: ['./explore-topics.component.scss']
})
export class ExploreTopicsComponent {

  topics: TopicsResponse | undefined | null
  posts: PostsResponse | undefined | null
  latest: Post | undefined
  error: string | undefined
  isLoading: boolean = false

  constructor(private dialog: MatDialog, private http: HttpClient, public base: BaseService, public breakpointObserver: BreakpointObserver) {
    this.getTopics(this.base.base_uri_api + 'categories')
    this.getPosts(this.base.base_uri_api + 'posts')
  }

  pageEevent: PageEvent = new PageEvent()
  paginate($event: PageEvent) {
    this.getTopics(this.base.base_uri_api + `categories?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }


  getTopics(url: string, pageEevent?: PageEvent) {
    this.http.get(url, { observe: 'response', params: new HttpParams().append('with', 'posts,posts.photo,posts.author,') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.topics = response.body
        }
        this.isLoading = false
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message

        this.isLoading = false
      }
    })

  }

  getPosts(url: string, pageEevent?: PageEvent) {
            this.isLoading = true
    this.http.get(url, { observe: 'response', params: new HttpParams().append('with', 'categories, author,author.photo, photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.posts = response.body
          if (this.posts) {
            this.latest = this.posts.data[0]
            this.isLoading = false
          } else {
            this.isLoading = true
          }
        }
        this.isLoading = false
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message

        this.isLoading = true
      }
    })

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  searchQuery: string = '';
  search(): void {
    console.log('Search query:', this.searchQuery);
  }

}
