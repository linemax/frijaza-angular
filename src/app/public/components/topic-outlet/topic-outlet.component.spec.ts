import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicOutletComponent } from './topic-outlet.component';

describe('TopicOutletComponent', () => {
  let component: TopicOutletComponent;
  let fixture: ComponentFixture<TopicOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicOutletComponent]
    });
    fixture = TestBed.createComponent(TopicOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
