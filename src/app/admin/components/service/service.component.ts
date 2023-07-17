import { HttpClient, HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/Interfaces/author';
import { Service, ServicesResponse } from 'src/app/Interfaces/service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {


  services: ServicesResponse | undefined | null

  constructor(private dialog: MatDialog, public base: BaseService, private snackBar: MatSnackBar, private http: HttpClient) {
    this.get_services(this.base.base_uri_api + 'services')

  }
  refresh() {
    this.get_services(this.base.base_uri_api + 'services')
  }

  delete(_t67: Service) {
    this.snackBar.open(`Confirm ${_t67.name} Service Deletion`, 'CONFIRM', { duration: 7000 }).onAction().subscribe(() => {
      this.http.delete(this.base.base_uri_api + `services/${_t67.id}`, { observe: 'response', withCredentials: true }).subscribe({
        next: (response: HttpResponse<any>) => {
          this.snackBar.open(`service ${_t67.name} deleted.`, '', { duration: 3000 })
          this.get_services(this.base.base_uri_api + 'services')
        }
      })
    })
  }

  pageEevent: PageEvent = new PageEvent()

  paginate($event: PageEvent) {
    this.get_services(this.base.base_uri_api + `services?page=${$event.pageIndex + 1}&pageSize=${$event.pageSize}`, $event)
  }

  get_services(url: string, pageEvent?: PageEvent) {
    this.http.get(url, { withCredentials: true, observe: 'response', params: new HttpParams().append('with', 'photo') }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.ok) {
          this.services = response.body
          if (pageEvent)
            this.pageEevent = pageEvent
        }
      }, error: (errorResponse: HttpErrorResponse) => {

      }
    })
  }

}
