import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalVetVisitDetailsComponent } from './animal-vet-visit-details.component';

describe('AnimalVetVisitDetailsComponent', () => {
  let component: AnimalVetVisitDetailsComponent;
  let fixture: ComponentFixture<AnimalVetVisitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalVetVisitDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalVetVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
