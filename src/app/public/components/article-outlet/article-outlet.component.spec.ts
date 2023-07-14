import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleOutletComponent } from './article-outlet.component';

describe('ArticleOutletComponent', () => {
  let component: ArticleOutletComponent;
  let fixture: ComponentFixture<ArticleOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleOutletComponent]
    });
    fixture = TestBed.createComponent(ArticleOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
