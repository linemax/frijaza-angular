import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private activateRoute: ActivatedRoute,
    public base: BaseService,
    private http: HttpClient,

  ) {
    this.activateRoute.data.subscribe(
      ({ topic }) => {
        this.topic = topic
      });
  }


}
