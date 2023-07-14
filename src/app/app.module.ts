import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { PublicModule } from './public/public.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor, loadingServiceFactory } from './interceptors/loading.interceptor';
import { XsrfInterceptor } from './interceptors/xsrf.interceptor';
import { LoadingService } from './services/loading.service';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { HomeIndexComponent } from './components/home-index/home-index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    HomeIndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule.forRoot(
      {
        locals: {
          // menu
          bold: 'Bold',
          italic: 'Italic',
          code: 'Code',
          blockquote: 'Blockquote',
          underline: 'Underline',
          strike: 'Strike',
          bullet_list: 'Bullet List',
          ordered_list: 'Ordered List',
          heading: 'Heading',
          h1: 'Header 1',
          h2: 'Header 2',
          h3: 'Header 3',
          h4: 'Header 4',
          h5: 'Header 5',
          h6: 'Header 6',
          align_left: 'Left Align',
          align_center: 'Center Align',
          align_right: 'Right Align',
          align_justify: 'Justify',
          text_color: 'Text Color',
          background_color: 'Background Color',

          // popups, forms, others...
          url: 'URL',
          text: 'Text',
          openInNewTab: 'Open in new tab',
          insert: 'Insert',
          altText: 'Alt Text',
          title: 'Title',
          remove: 'Remove',
        },
      }
    ),
    AdminModule,
    SharedModule,
    PublicModule,
    BrowserAnimationsModule
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: XsrfInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: LoadingService,
      useFactory: loadingServiceFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
