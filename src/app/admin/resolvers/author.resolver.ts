import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Author } from 'src/app/Interfaces/author';
import { BaseService } from 'src/app/services/base.service';

export const authorResolver: ResolveFn<Author> = (route, state) => {

  const http = inject(HttpClient)
  const base = inject(BaseService)
  return http.get<Author>(base.base_uri_api + 'authors/' + route.paramMap.get('id'), { withCredentials: true, observe: "body", params: new HttpParams().append('with', 'posts,posts.photo, user, photo') });
};
