import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetailsVetVisitsComponent } from './animal-details-vet-visits.component';

describe('AnimalDetailsVetVisitsComponent', () => {
  let component: AnimalDetailsVetVisitsComponent;
  let fixture: ComponentFixture<AnimalDetailsVetVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalDetailsVetVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDetailsVetVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
