import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalFormGeneralInfoComponent } from './animal-form-general-info.component';

describe('AnimalFormGeneralInfoComponent', () => {
  let component: AnimalFormGeneralInfoComponent;
  let fixture: ComponentFixture<AnimalFormGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalFormGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalFormGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
