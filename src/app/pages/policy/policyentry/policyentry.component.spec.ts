import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyEntryComponent } from './policyentry.component';

describe('PolicyEntryComponent', () => {
  let component: PolicyEntryComponent;
  let fixture: ComponentFixture<PolicyEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
