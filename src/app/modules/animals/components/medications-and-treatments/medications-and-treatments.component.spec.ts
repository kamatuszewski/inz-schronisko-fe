import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsAndTreatmentsComponent } from './medications-and-treatments.component';

describe('MedicationsAndTreatmentsComponent', () => {
  let component: MedicationsAndTreatmentsComponent;
  let fixture: ComponentFixture<MedicationsAndTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationsAndTreatmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsAndTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
