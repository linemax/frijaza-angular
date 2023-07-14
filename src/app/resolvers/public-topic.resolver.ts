import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Topic } from 'src/app/Interfaces/topic';
import { BaseService } from 'src/app/services/base.service';

export const publicTopicResolver: ResolveFn<Topic> = (route, state) => {

  const http = inject(HttpClient)
  const base = inject(BaseService)
  return http.get<Topic>(base.base_uri_api + 'categories/' + route.paramMap.get('id'), { withCredentials: true, observe: "body", params: new HttpParams().append('with', 'posts, posts.photo, posts.author') });
};
