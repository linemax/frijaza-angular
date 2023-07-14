import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { Post } from '../Interfaces/post';

export const publicArticleResolver: ResolveFn<Post> = (route, state) => {

  const http = inject(HttpClient)
  const base = inject(BaseService)
  return http.get<Post>(base.base_uri_api + 'posts/' + route.paramMap.get('id'), { withCredentials: true, observe: "body", params: new HttpParams().append('with', 'category, author, author.photo, photo') });
};
