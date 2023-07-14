import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/Interfaces/post';
import { BaseService } from 'src/app/services/base.service';

export const postResolver: ResolveFn<Post> = (route, state) => {

  const http = inject(HttpClient)
  const base = inject(BaseService)
  return http.get<Post>(base.base_uri_api + 'posts/' + route.paramMap.get('id'), { withCredentials: true, observe: "body", params: new HttpParams().append('with', 'category, author, photo') });
};
