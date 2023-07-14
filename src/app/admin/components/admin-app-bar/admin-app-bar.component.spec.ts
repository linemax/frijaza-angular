import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppBarComponent } from './admin-app-bar.component';

describe('AdminAppBarComponent', () => {
  let component: AdminAppBarComponent;
  let fixture: ComponentFixture<AdminAppBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAppBarComponent]
    });
    fixture = TestBed.createComponent(AdminAppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
