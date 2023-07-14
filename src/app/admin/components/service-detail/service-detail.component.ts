import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/Interfaces/service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent {

  service: Service | undefined | null

  constructor(
    private activateRoute: ActivatedRoute,
    public base: BaseService,
    private http: HttpClient,
    private snack: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,

  ) {
    this.activateRoute.data.subscribe(
      ({ service }) => {
        this.service = service
      });
  }


  uploadImage(event: any) {
    if (event.target.files[0]) {
      let form = new FormData()
      form.append('photo', event.target.files[0])
      this.http.post<any>(
        this.base.base_uri_api + 'services/' + this.service?.id + '/photo',
        form,
        { observe: "response", withCredentials: true }).subscribe({
          next: (response: HttpResponse<any>) => {
            if (response.ok) {
              this.snack.open('upload complete', '', { duration: 5000 })
            }
          }
        })
    }
  }
}
