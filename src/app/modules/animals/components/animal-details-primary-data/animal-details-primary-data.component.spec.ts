import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetailsPrimaryDataComponent } from './animal-details-primary-data.component';

describe('AnimalDetailsPrimaryDataComponent', () => {
  let component: AnimalDetailsPrimaryDataComponent;
  let fixture: ComponentFixture<AnimalDetailsPrimaryDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalDetailsPrimaryDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDetailsPrimaryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
