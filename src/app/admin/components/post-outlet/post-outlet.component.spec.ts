import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOutletComponent } from './post-outlet.component';

describe('PostOutletComponent', () => {
  let component: PostOutletComponent;
  let fixture: ComponentFixture<PostOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostOutletComponent]
    });
    fixture = TestBed.createComponent(PostOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
