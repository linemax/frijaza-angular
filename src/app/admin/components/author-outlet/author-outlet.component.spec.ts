import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorOutletComponent } from './author-outlet.component';

describe('AuthorOutletComponent', () => {
  let component: AuthorOutletComponent;
  let fixture: ComponentFixture<AuthorOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorOutletComponent]
    });
    fixture = TestBed.createComponent(AuthorOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
