import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Service } from 'src/app/Interfaces/service';
import { BaseService } from 'src/app/services/base.service';

export const ServiceResolver: ResolveFn<Service> = (route, state) => {

  const http = inject(HttpClient)
  const base = inject(BaseService)
  return http.get<Service>(base.base_uri_api + 'services/' + route.paramMap.get('id'), { withCredentials: true, observe: "body", params: new HttpParams().append('with', 'photo') });
};
