import { HttpResponse, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Author, AuthorsResponse } from 'src/app/Interfaces/author';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {


  refresh() {
    this.get_authors(this.base.base_uri_api + 'authors')
  }

  delete(_t67: Author) {
    this.snackBar.open(`Confirm ${_t67.fname} author Deletion`, 'CONFIRM', { duration: 7000 }).onAction().subscribe(() => {
      this.http.delete(this.base.base_uri_api + `authors/${_t67.id}`, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          this.snackBar.open(`author ${_t67.fname} deleted.`, '', { duration: 3000 })
          this.get_authors(this.base.base_uri_api + 'authors')
        }
      })
    })
  }

  pageEevent: PageEvent = new PageEvent()

  paginate($event: PageEvent) {
    this.get_authors(this.base.base_uri_api + `authors?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }

  @ViewChild('authorsList') authorsList: MatSelectionList | undefined

  authors: AuthorsResponse | undefined

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private base: BaseService, private http: HttpClient) {
    this.subscription = this.modelChanged
      .pipe(
        debounceTime(this.debounceTime),
      )
      .subscribe(() => {
        this.get_search_results();
      });
    this.get_authors(this.base.base_uri_api + 'authors')

  }

  search() {
    this.modelChanged.next("")
  }

  authorsSearchResults: {
    "searchable": Author,
    "title": string,
    "url": string,
    "type": string
  }[] | undefined

  authorsSearch = new FormControl('')

  get_search_results() {
    if (this.authorsSearch.value) {
      this.http.get(this.base.base_uri_api + 'authors/search', { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'posts,user, photos').append('search', this.authorsSearch.value) }).subscribe({
        next: (response: HttpResponse<any>) => {
          this.authorsSearchResults = response.body
        }
      })
    } else {
      this.authorsSearch.setValue('')
    }
  }

  private modelChanged: Subject<string> = new Subject<string>();
  private subscription: Subscription;
  private debounceTime = 800;


  displayedColumns: string[] = ['fname', 'post', 'post2'];

  get_authors(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { withCredentials: true, observe: 'response', params: new HttpParams().append('with', 'posts,user, photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.authors = response.body
          if (pageEvent)
            this.pageEevent = pageEvent
        }
      }, error: (errorResponse: HttpErrorResponse) => {

      }
    })
  }
}
