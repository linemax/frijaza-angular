import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServiceComponent } from './public-service.component';

describe('PublicServiceComponent', () => {
  let component: PublicServiceComponent;
  let fixture: ComponentFixture<PublicServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicServiceComponent]
    });
    fixture = TestBed.createComponent(PublicServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
