import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicApprBarComponent } from './public-appr-bar.component';

describe('PublicApprBarComponent', () => {
  let component: PublicApprBarComponent;
  let fixture: ComponentFixture<PublicApprBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicApprBarComponent]
    });
    fixture = TestBed.createComponent(PublicApprBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
