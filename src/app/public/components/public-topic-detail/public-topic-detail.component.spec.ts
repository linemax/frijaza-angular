import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTopicDetailComponent } from './public-topic-detail.component';

describe('PublicTopicDetailComponent', () => {
  let component: PublicTopicDetailComponent;
  let fixture: ComponentFixture<PublicTopicDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicTopicDetailComponent]
    });
    fixture = TestBed.createComponent(PublicTopicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
