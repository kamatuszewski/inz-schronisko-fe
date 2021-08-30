import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsAndTreatmentsItemComponent } from './medications-and-treatments-item.component';

describe('MedicationsAndTreatmentsItemComponent', () => {
  let component: MedicationsAndTreatmentsItemComponent;
  let fixture: ComponentFixture<MedicationsAndTreatmentsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationsAndTreatmentsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsAndTreatmentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
