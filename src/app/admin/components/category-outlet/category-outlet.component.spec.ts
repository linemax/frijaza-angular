import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOutletComponent } from './category-outlet.component';

describe('CategoryOutletComponent', () => {
  let component: CategoryOutletComponent;
  let fixture: ComponentFixture<CategoryOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryOutletComponent]
    });
    fixture = TestBed.createComponent(CategoryOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
