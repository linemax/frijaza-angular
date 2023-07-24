import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient, private base: BaseService) { }


  getTopics(){
    return this.http.get(this.base.base_uri_api+'categories', { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'posts') })
  }
  
  getPosts(){
    return this.http.get(this.base.base_uri_api+'posts', { observe: 'response', withCredentials: true, params: new HttpParams().append('with', 'categories, author, photo') })
  }
  
  getAuthors(){
    return this.http.get(this.base.base_uri_api+'authors', { withCredentials: true, observe: 'response', params: new HttpParams().append('with', 'posts,user, photo') })
  }
}
