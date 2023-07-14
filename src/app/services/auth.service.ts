import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { Channel } from 'laravel-echo';
import { EchoService } from './echo.service';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loggedInUserModel = new SelectionModel<User>(false, undefined, true)
  // channel: Channel | undefined
  userChannelSelectionModel = new SelectionModel<Channel>(false, undefined, true)

  constructor(private echo: EchoService, private base: BaseService, private router: Router, private http: HttpClient) {
    if (this.loggedInUserModel.isEmpty()) {
      this.get()
    }
    if (this.echo.echoSelectionModel.hasValue()) {
      this.listenToChannel()
    } else {
      this.echo.echoSelectionModel.changed.subscribe(() => {
        this.listenToChannel()
      })
    }

  }

  listenToChannel() {
    if (this.loggedInUserModel.hasValue()) {
      this.userChannelSelectionModel.select(this.echo.echoSelectionModel.selected[0].private('App.Models.User.' + this.loggedInUserModel.selected[0].id))
    } else {
      this.loggedInUserModel.changed.subscribe(() => {
        if (this.loggedInUserModel.hasValue()) {
          this.userChannelSelectionModel.select(this.echo.echoSelectionModel.selected[0].private('App.Models.User.' + this.loggedInUserModel.selected[0].id))
        }
      })
    }
  }

  get() {
    this.http.get<any>(this.base.base_uri_api + 'user', { withCredentials: true, observe: 'response' }).subscribe({
      next: (response: HttpResponse<User>) => {
        if (response.ok && response.body) {
          this.loggedInUserModel.select(response.body)
        }
      }
    })
  }

  logout() {
    this.http.post(this.base.base_uri + 'logout', {}, { observe: 'response', withCredentials: true }).subscribe(
      {
        next: (response: HttpResponse<any>) => {
          if (response.ok) {
            this.get()
          }
        }
      }
    )
  }
}
