import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { TopicsResponse } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-public-appr-bar',
  templateUrl: './public-appr-bar.component.html',
  styleUrls: ['./public-appr-bar.component.scss']
})
export class PublicApprBarComponent {

  topics: TopicsResponse | undefined | null

  constructor(private dialog: MatDialog, private breakpointObserver: BreakpointObserver, private http: HttpClient, public base: BaseService, private activateRoute: ActivatedRoute,) {
    this.getTopics(this.base.base_uri_api + 'categories')
  }

  searchQuery: string = '';
  search(): void {
    console.log('Search query:', this.searchQuery);
  }


  isToolbarHidden = false;

  closeToolbar() {
    this.isToolbarHidden = true;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  getTopics(url: string, pageEevent?: PageEvent) {
    this.http.get(url, { observe: 'response', params: new HttpParams().append('with', 'posts') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.topics = response.body
        }
      },
    })

  }

}
