import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAdoptionFormComponent } from './animal-adoption-form.component';

describe('AnimalAdoptionFormComponent', () => {
  let component: AnimalAdoptionFormComponent;
  let fixture: ComponentFixture<AnimalAdoptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalAdoptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAdoptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
