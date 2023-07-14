import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-app-bar',
  templateUrl: './admin-app-bar.component.html',
  styleUrls: ['./admin-app-bar.component.scss']
})
export class AdminAppBarComponent {

  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
