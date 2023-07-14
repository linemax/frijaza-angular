import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOutletComponent } from './service-outlet.component';

describe('ServiceOutletComponent', () => {
  let component: ServiceOutletComponent;
  let fixture: ComponentFixture<ServiceOutletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceOutletComponent]
    });
    fixture = TestBed.createComponent(ServiceOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
