import { Injectable } from '@angular/core';
import { EchoService } from './echo.service';

import { SelectionModel } from '@angular/cdk/collections';
import { Channel } from 'laravel-echo';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { Post } from '../Interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {



  postModel = new SelectionModel<Post>(false, undefined, true)
  // channel: Channel | undefined
  PostSelectionModel = new SelectionModel<Channel>(false, undefined, true)

  constructor(private echo: EchoService, private base: BaseService, private http: HttpClient) {
    if (this.PostSelectionModel.hasValue()) {
      this.getPost(`${this.base.base_uri_api}posts/${this.postModel.selected[0].id}`)
    } else {
      this.postModel.changed.subscribe(value => {
        if (this.postModel.hasValue()) {
          this.getPost(`${this.base.base_uri_api}posts/${this.postModel.selected[0].id}`)
        }
      })
    }
    this.listenChannel()
  }

  listenChannel() {
    if (this.postModel.hasValue()) {
      this.PostSelectionModel.select(this.echo.echoSelectionModel.selected[0].private('App.Models.Post.' + this.postModel.selected[0].id))
    } else {
      this.postModel.changed.subscribe(() => {
        if (this.postModel.hasValue()) {
          this.PostSelectionModel.select(this.echo.echoSelectionModel.selected[0].private('App.Models.Post.' + this.postModel.selected[0].id))
        }
      })
    }
    this.postUpdated()

  }

  postUpdated() {
    this.echo.echoSelectionModel.selected[0].private('App.Models.Post.' + this.postModel.selected?.[0]?.id).listen('.PostUpdated', (event: any) => {
      this.postModel.selected[0].id = event.model
      // refresh Post
      this.getPost(`${this.base.base_uri_api}posts/${this.postModel.selected[0]?.id}`)
      this.PostSelectionModel.select(event.model)
    });
  }

  get_post(id: string) {
    return this.http.get<any>(`${this.base.base_uri_api}posts/${id}`, { observe: 'body', withCredentials: true })
  }


  getPost(url: string) {
    this.http.get(url, { withCredentials: true, observe: 'response', params: new HttpParams().append('include', 'photo,author,author.photo,categories') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.postModel.select(response.body)
        }
      }
    })
  }


}
