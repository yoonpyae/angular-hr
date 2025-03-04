import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductionEntryComponent } from './deduction-entry.component';

describe('DeductionEntryComponent', () => {
  let component: DeductionEntryComponent;
  let fixture: ComponentFixture<DeductionEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeductionEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeductionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
