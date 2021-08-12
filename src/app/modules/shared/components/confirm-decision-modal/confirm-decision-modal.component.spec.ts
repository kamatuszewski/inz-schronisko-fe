import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDecisionModalComponent } from './confirm-decision-modal.component';

describe('ConfirmDecisionModalComponent', () => {
  let component: ConfirmDecisionModalComponent;
  let fixture: ComponentFixture<ConfirmDecisionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDecisionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDecisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
