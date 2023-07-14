import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { AuthorComponent } from './components/author/author.component';
import { ServiceComponent } from './components/service/service.component';
import { AccountComponent } from './components/account/account.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { authorResolver } from './resolvers/author.resolver';
import { AuthorOutletComponent } from './components/author-outlet/author-outlet.component';
import { PostOutletComponent } from './components/post-outlet/post-outlet.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { postResolver } from './resolvers/post.resolver';
import { CategoryOutletComponent } from './components/category-outlet/category-outlet.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { categoryResolver } from './resolvers/category.resolver';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ServiceOutletComponent } from './components/service-outlet/service-outlet.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceResolver } from './resolvers/service.resolver';
import { AddServiceComponent } from './components/add-service/add-service.component';
const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: DashboardComponent, children: [
      { path: '', component: IndexComponent },
      {
        path: 'articles', component: ArticlesComponent, children: [
          {
            path: '', component: PostOutletComponent, children: [
              { path: '', component: PostComponent },
              { path: 'add', component: AddPostComponent, data: { active: 'posts' } },
              { path: ':id', component: PostDetailComponent, resolve: { post: postResolver } },
            ]
          },
          {
            path: 'topic', component: CategoryOutletComponent, children: [

              { path: '', component: CategoryComponent },
              { path: ':id', component: CategoryDetailComponent, resolve: { category: categoryResolver } },
            ]
          },
        ]
      },
      {
        path: 'authors', component: AuthorOutletComponent, children: [
          { path: '', component: AuthorComponent },
          { path: 'add', component: AddAuthorComponent, data: { active: 'authors' } },
          { path: ':id', component: AuthorDetailComponent, resolve: { author: authorResolver } },
        ]
      },

      {
        path: 'services', component: ServiceOutletComponent, children: [
          { path: '', component: ServiceComponent },
          { path: 'add', component: AddServiceComponent, data: { active: 'services' } },
          { path: ':id', component: ServiceDetailComponent, resolve: { service: ServiceResolver } },
        ]
      },
      { path: 'account', component: AccountComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

