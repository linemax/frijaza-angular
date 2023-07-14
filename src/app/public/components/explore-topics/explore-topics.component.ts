import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-explore-topics',
  templateUrl: './explore-topics.component.html',
  styleUrls: ['./explore-topics.component.scss']
})
export class ExploreTopicsComponent {

  topics: TopicsResponse | undefined | null
  constructor(private dialog: MatDialog, private http: HttpClient, public base: BaseService,) {
    this.getTopics(this.base.base_uri_api + 'categories')
  }

  pageEevent: PageEvent = new PageEvent()
  paginate($event: PageEvent) {
    this.getTopics(this.base.base_uri_api + `categories?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
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

  searchQuery: string = '';
  search(): void {
    console.log('Search query:', this.searchQuery);
  }

}
