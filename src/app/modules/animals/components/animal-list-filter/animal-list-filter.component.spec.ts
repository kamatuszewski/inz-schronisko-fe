import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalListFilterComponent } from './animal-list-filter.component';

describe('AnimalListFilterComponent', () => {
  let component: AnimalListFilterComponent;
  let fixture: ComponentFixture<AnimalListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
