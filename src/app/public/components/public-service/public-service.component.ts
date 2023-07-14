import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Service, ServicesResponse } from 'src/app/Interfaces/service';
import { BaseService } from 'src/app/services/base.service';
import { PublicServiceDetailComponent } from '../public-service-detail/public-service-detail.component';
import { EmailComponent } from '../email/email.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-public-service',
  templateUrl: './public-service.component.html',
  styleUrls: ['./public-service.component.scss']
})
export class PublicServiceComponent {

  service: ServicesResponse | undefined | null
  serviceResponse: ServicesResponse | undefined | null
  constructor(private dialog: MatDialog, private http: HttpClient, public base: BaseService,private _bottomSheet: MatBottomSheet) {
    this.getServices(this.base.base_uri_api + 'services')
  }

  pageEevent: PageEvent = new PageEvent()
  paginate($event: PageEvent) {
    this.getServices(this.base.base_uri_api + `services?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }

  serviceDialog(service: Service) {
    this.dialog.open(PublicServiceDetailComponent, {
      data: service
    })
  }

  emailDialog() {
    this._bottomSheet.open(EmailComponent, {
    })
  }

  getServices(url: string, pageEevent?: PageEvent) {
    this.http.get(url, { observe: 'response', params: new HttpParams().append('with', 'photo')  }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.serviceResponse = response.body
        }
      },
    })

  }

}
