import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeIndexComponent } from './components/home-index/home-index.component';
import { PublicApprBarComponent } from './components/public-appr-bar/public-appr-bar.component';
import { SharedModule } from '../shared/shared.module';
import { BlogArticlesComponent } from './components/blog-articles/blog-articles.component';
import { LatestArticlesComponent } from './components/latest-articles/latest-articles.component';
import { ExploreTopicsComponent } from './components/explore-topics/explore-topics.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChargesComponent } from './components/charges/charges.component';
import { PublicServiceComponent } from './components/public-service/public-service.component';
import { PublicServiceDetailComponent } from './components/public-service-detail/public-service-detail.component';
import { PublicTopicDetailComponent } from './components/public-topic-detail/public-topic-detail.component';
import { PublicTopicComponent } from './components/public-topic/public-topic.component';
import { TopicOutletComponent } from './components/topic-outlet/topic-outlet.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { ArticleOutletComponent } from './components/article-outlet/article-outlet.component';
import { ArticleComponent } from './components/article/article.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorComponent } from './components/author/author.component';
import { AuthorOutletComponent } from './components/author-outlet/author-outlet.component';
import { EmailComponent } from './components/email/email.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyComponent } from './components/privacy/privacy.component';


@NgModule({
  declarations: [
    HomeIndexComponent,
    PublicApprBarComponent,
    BlogArticlesComponent,
    LatestArticlesComponent,
    ExploreTopicsComponent,
    HomeComponent,
    FooterComponent,
    ChargesComponent,
    PublicServiceComponent,
    PublicServiceDetailComponent,
    PublicTopicDetailComponent,
    PublicTopicComponent,
    TopicOutletComponent,
    TopicDetailComponent,
    ArticleOutletComponent,
    ArticleComponent,
    ArticleDetailComponent,
    AuthorDetailComponent,
    AuthorComponent,
    AuthorOutletComponent,
    EmailComponent,
    AboutComponent,
    ContactComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
