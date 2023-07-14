import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AdminAppBarComponent } from './components/admin-app-bar/admin-app-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { AuthorComponent } from './components/author/author.component';
import { ServiceComponent } from './components/service/service.component';
import { AccountComponent } from './components/account/account.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorOutletComponent } from './components/author-outlet/author-outlet.component';
import { CategoryOutletComponent } from './components/category-outlet/category-outlet.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostOutletComponent } from './components/post-outlet/post-outlet.component';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceOutletComponent } from './components/service-outlet/service-outlet.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';


@NgModule({
  declarations: [
    LoginComponent,
    AdminAppBarComponent,
    DashboardComponent,
    IndexComponent,
    ArticlesComponent,
    AuthorComponent,
    ServiceComponent,
    AccountComponent,
    AddAuthorComponent,
    AuthorDetailComponent,
    AuthorOutletComponent,
    CategoryOutletComponent,
    CategoryComponent,
    CategoryDetailComponent,
    AddCategoryComponent,
    PostDetailComponent,
    PostOutletComponent,
    PostComponent,
    AddPostComponent,
    AddServiceComponent,
    ServiceDetailComponent,
    ServiceOutletComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AdminModule { }
