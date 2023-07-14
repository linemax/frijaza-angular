import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeIndexComponent } from './components/home-index/home-index.component';
import { HomeComponent } from './components/home/home.component';
import { ExploreTopicsComponent } from './components/explore-topics/explore-topics.component';
import { PublicServiceComponent } from './components/public-service/public-service.component';
import { TopicOutletComponent } from './components/topic-outlet/topic-outlet.component';
import { publicTopicResolver } from '../resolvers/public-topic.resolver';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { PublicTopicDetailComponent } from './components/public-topic-detail/public-topic-detail.component';
import { publicArticleResolver } from '../resolvers/public-article.resolver';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleOutletComponent } from './components/article-outlet/article-outlet.component';
import { ArticleComponent } from './components/article/article.component';
import { BlogArticlesComponent } from './components/blog-articles/blog-articles.component';
import { AuthorOutletComponent } from './components/author-outlet/author-outlet.component';
import { AuthorComponent } from './components/author/author.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { authorResolver } from '../admin/resolvers/author.resolver';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: HomeIndexComponent },
      {
        path: 'topics', component: TopicOutletComponent, children: [
          { path: '', component: ExploreTopicsComponent },
          { path: ':id', component: PublicTopicDetailComponent, resolve: { topic: publicTopicResolver } },
        ]
      },
      {
        path: 'posts', component: ArticleOutletComponent, children: [
          { path: '', component: BlogArticlesComponent },
          { path: ':id', component: ArticleDetailComponent, resolve: { post: publicArticleResolver } },
        ]
      },
      {
        path: 'authors', component: AuthorOutletComponent, children: [
          { path: '', component: AuthorComponent },
          { path: ':id', component: AuthorDetailComponent, resolve: { author: authorResolver } },
        ]
      },
      { path: 'services', component: PublicServiceComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
