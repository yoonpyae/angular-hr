import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowanceEntryComponent } from './allowance-entry.component';

describe('AllowanceEntryComponent', () => {
  let component: AllowanceEntryComponent;
  let fixture: ComponentFixture<AllowanceEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllowanceEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowanceEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
