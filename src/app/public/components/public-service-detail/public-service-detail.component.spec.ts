import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServiceDetailComponent } from './public-service-detail.component';

describe('PublicServiceDetailComponent', () => {
  let component: PublicServiceDetailComponent;
  let fixture: ComponentFixture<PublicServiceDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicServiceDetailComponent]
    });
    fixture = TestBed.createComponent(PublicServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
