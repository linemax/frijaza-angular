import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { User } from 'src/app/Interfaces/User';
import { Author } from 'src/app/Interfaces/author';
import { Post, PostsResponse } from 'src/app/Interfaces/post';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent {


  pageEevent: PageEvent = new PageEvent()

  paginate($event: PageEvent) {
    this.getPosts(this.base.base_uri_api + `authors?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }
  displayedColumns: string[] = ['title', 'description', 'read_time', 'updated', 'created'];

  User: User | null | undefined
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

  ) {
    this.activateRoute.data.subscribe(
      ({ author }) => {
        this.author = author
        if (this.author) {
          this.authFormGroup.controls.fname.setValue(this.author.fname)
          this.authFormGroup.controls.user.setValue(this.author.user?.name)
        }
      });
    this.getPosts(this.base.base_uri_api + 'posts')
  }

  ngOnInit(): void {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  getPosts(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { observe: 'response', withCredentials: true,  params: new HttpParams().append('with', 'posts,user, photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.posts = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })
  }

  submit() {
    if (this.author) {
      this.authFormGroup.disable()
      this.http.post(this.base.base_uri_api + `authors/${this.author.id}`, this.authFormGroup.value, { withCredentials: true, observe: 'response' }).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.authFormGroup.enable()
            this.snack.open(`${this.authFormGroup.controls.fname.value} edited!`, '', { duration: 3000 })
          }
        }, error: (errorResponse: HttpErrorResponse) => {
          this.authFormGroup.enable()
          switch (errorResponse.status) {
            case 422:
              if (errorResponse.error['errors']) {
                if (errorResponse.error['errors'].fname) {
                  this.authFormGroup.controls.fname.setErrors({ backend: errorResponse.error['errors'].fname })
                }
              }
          }
        }, complete: () => {
          this.authFormGroup.enable()
        }
      })

    }
  }

  uploadImage(event: any) {
    if (event.target.files[0]) {
      let form = new FormData()
      form.append('photo', event.target.files[0])
      this.http.post<any>(
        this.base.base_uri_api + 'authors/' + this.author?.id + '/photo',
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

  authFormGroup = new FormGroup({
    fname: new FormControl(''),
    user: new FormControl({ value: '', disabled: true }),
  })
}
