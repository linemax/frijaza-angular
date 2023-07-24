import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpEventType } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { Observable, Subscription, map, shareReplay } from 'rxjs';
import { User, UsersResponse } from 'src/app/Interfaces/User';
import { Author } from 'src/app/Interfaces/author';
import { Post, PostsResponse } from 'src/app/Interfaces/post';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit, OnDestroy {
  editor: Editor | undefined | null;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    if (this.editor)
      this.editor.destroy();
  }

  pageEevent: PageEvent = new PageEvent()

  paginate($event: PageEvent) {
    this.getPosts(this.base.base_uri_api + `authors?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }
  displayedColumns: string[] = ['title', 'description', 'read_time', 'updated', 'created'];

  User: User | null | undefined
  author: Author | null | undefined
  user: UsersResponse | null | undefined
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
          this.authFormGroup.controls.name.setValue(this.author.name)
          this.authFormGroup.controls.email.setValue(this.author.email)
          this.authFormGroup.controls.phone.setValue(this.author.phone)
          this.authFormGroup.controls.bio.setValue(this.author.bio)
          this.authFormGroup.controls.user.setValue(this.author.user?.id)
        }
      });
    this.getPosts(this.base.base_uri_api + 'posts')
    this.getUser(this.base.base_uri_api + 'users')
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

  getUser(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { observe: 'response', withCredentials: true,  params: new HttpParams().append('with', 'author,author.posts, author.photo') }).subscribe({
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
            this.snack.open(`${this.authFormGroup.controls.name.value} edited!`, '', { duration: 3000 })
          }
        }, error: (errorResponse: HttpErrorResponse) => {
          this.authFormGroup.enable()
          switch (errorResponse.status) {
            case 422:
              if (errorResponse.error['errors']) {
                if (errorResponse.error['errors'].name) {
                  this.authFormGroup.controls.name.setErrors({ backend: errorResponse.error['errors'].name })
                }
                if (errorResponse.error['errors'].email) {
                  this.authFormGroup.controls.email.setErrors({ backend: errorResponse.error['errors'].email })
                }
                if (errorResponse.error['errors'].phone) {
                  this.authFormGroup.controls.phone.setErrors({ backend: errorResponse.error['errors'].phone })
                }
                if (errorResponse.error['errors'].bio) {
                  this.authFormGroup.controls.bio.setErrors({ backend: errorResponse.error['errors'].bio })
                }
              }
          }
        }, complete: () => {
          this.authFormGroup.enable()
        }
      })

    }
  }



  uploadProgress: number | undefined | null;
  uploadSub: Subscription | undefined | null;

  uploadImage(event: any) {
    if (event.target.files[0]) {
      let form = new FormData()
      form.append('photo', event.target.files[0])
      const upload$ = this.http.post<any>(
        this.base.base_uri_api + 'authors/' + this.author?.id + '/photo',
        form,
        { observe: "response", withCredentials: true, reportProgress: true }).subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.ok) {
              if (event.type == HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
              }
              this.snack.open('Upload complete', '', { duration: 5000 })
            }
          }
        })
    }
  }


  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  authFormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    bio: new FormControl(''),
    user: new FormControl({ value: '', disabled: true }),
    editorContent: new FormControl('', Validators.required())
  })
}
