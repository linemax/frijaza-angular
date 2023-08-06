import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadProgressBarComponent } from './read-progress-bar.component';

describe('ReadProgressBarComponent', () => {
  let component: ReadProgressBarComponent;
  let fixture: ComponentFixture<ReadProgressBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadProgressBarComponent]
    });
    fixture = TestBed.createComponent(ReadProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
