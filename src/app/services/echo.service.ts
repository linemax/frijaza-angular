import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import Echo from 'laravel-echo';

@Injectable({
  providedIn: 'root'
})
export class EchoService {

  echoSelectionModel = new SelectionModel<Echo>(false, undefined, true)

  constructor(private http: HttpClient, private base: BaseService) {
    let Pusher = require('pusher-js');
    this.connect(Pusher)
  }

  connect(Pusher: any) {
    Pusher.Runtime.createXHR = function () {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      return xhr;
    };
    this.echoSelectionModel.select(
      new Echo({
        broadcaster: 'pusher',
        
        client: new Pusher('pusher_key', {
          cluster: 'mt1',
          wsHost: 'ws.freesoulijaza.com',
          wssHost: 'ws.freesoulijaza.com',
          enabledTransports: ['ws', 'wss'],
          wsPort: 80,
          wssPort: 443,
          forceTLS: false,
          logToConsole: true,
          disableStats: true,
          channelAuthorization: {
            endpoint: this.base.base_uri + 'broadcasting/auth',
            transport: 'ajax',
            headers: { 'X-XSRF-TOKEN': `${document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]}` }
          }
        }),
        // client: new Pusher('hope_key', {
        //   cluster: 'mt1',
        //   wsHost: 'localhost',
        //   wssHost: 'localhost',
        //   enabledTransports: ['ws', 'wss'],
        //   wsPort: 6001,
        //   wssPort: 6001,
        //   forceTLS: false,
        //   logToConsole: true,
        //   disableStats: false,
        //   channelAuthorization: {
        //     endpoint: this.base.base_uri + 'broadcasting/auth',
        //     transport: 'ajax',
        //     headers: { 'X-XSRF-TOKEN': `${document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]}` }
        //   }
        // }),
      })
    )
  }
}
