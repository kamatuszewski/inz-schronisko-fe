import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetailsAdoptionsComponent } from './animal-details-adoptions.component';

describe('AnimalDetailsAdoptionsComponent', () => {
  let component: AnimalDetailsAdoptionsComponent;
  let fixture: ComponentFixture<AnimalDetailsAdoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalDetailsAdoptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDetailsAdoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
