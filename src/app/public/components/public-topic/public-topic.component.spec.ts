import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicTopicComponent } from './public-topic.component';

describe('PublicTopicComponent', () => {
  let component: PublicTopicComponent;
  let fixture: ComponentFixture<PublicTopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicTopicComponent]
    });
    fixture = TestBed.createComponent(PublicTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
