import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { User } from 'src/app/Interfaces/User';
import { Author } from 'src/app/Interfaces/author';
import { PostsResponse } from 'src/app/Interfaces/post';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent {  User: User | null | undefined
  author: Author | null | undefined
  posts: PostsResponse | null | undefined

  error: string | undefined;

  constructor(
    private dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    public base: BaseService,
    private http: HttpClient,
    private snack: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    public sanitizer: DomSanitizer

  ) {
    this.activateRoute.data.subscribe(
      ({ author }) => {
        this.author = author
      });
      
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
