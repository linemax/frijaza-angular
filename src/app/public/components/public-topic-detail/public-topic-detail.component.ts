import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthorsResponse } from 'src/app/Interfaces/author';
import { PostsResponse } from 'src/app/Interfaces/post';
import { Topic } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-public-topic-detail',
  templateUrl: './public-topic-detail.component.html',
  styleUrls: ['./public-topic-detail.component.scss']
})
export class PublicTopicDetailComponent {
  topic: Topic | undefined
  error: string | undefined
  isLoading: boolean = false;


  constructor(
    private activateRoute: ActivatedRoute,
    public base: BaseService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,

  ) {
    this.activateRoute.data.subscribe(
      ({ topic }) => {
        if (topic) {
          this.topic = topic
          this.isLoading = false;
        } else {
          this.isLoading = true;
        }
        this.isLoading = false;

      });
  }



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



}
