import { Component } from '@angular/core';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Topic, TopicsResponse } from 'src/app/Interfaces/topic';
import { HttpClient, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  topics: TopicsResponse | undefined | null
  error: string | undefined | null

  constructor(private dialog: MatDialog, private base: BaseService, private snackBar: MatSnackBar, private http: HttpClient) {
    this.getTopics()

  }

  delete(_t67: Topic) {

    this.snackBar.open(`Confirm ${_t67.name} Topic Deletion`, 'CONFIRM', { duration: 7000 }).onAction().subscribe(() => {
      this.http.delete(this.base.base_uri_api + `categories/${_t67.id}`, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          this.snackBar.open(`Topic ${_t67.name} deleted.`, 'Close', { duration: 3000 })
        }
      })
    })
  }

  addTopic() {
    this.dialog.open(AddCategoryComponent, {
      width: '500px',
      hasBackdrop: true
    })
  }

  getTopics() {
    this.http.get(this.base.base_uri_api + 'categories', { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'posts') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.topics = response.body
        }
      }, error: (errorResponse: HttpErrorResponse) => {
        this.error = errorResponse.message
      }
    })

  }

}
