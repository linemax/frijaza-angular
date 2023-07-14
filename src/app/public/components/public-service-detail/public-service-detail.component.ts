import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Service } from 'src/app/Interfaces/service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-public-service-detail',
  templateUrl: './public-service-detail.component.html',
  styleUrls: ['./public-service-detail.component.scss']
})
export class PublicServiceDetailComponent {

  serviceDetail: Service | undefined

  constructor(
    private activateRoute: ActivatedRoute,
    public base: BaseService,
    private http: HttpClient,
    private snack: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public service: Service

  ) {
    this.serviceDetail = this.service
  }


}
