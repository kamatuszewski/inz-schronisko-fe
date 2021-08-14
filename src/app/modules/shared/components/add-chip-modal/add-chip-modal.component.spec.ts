import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChipModalComponent } from './add-chip-modal.component';

describe('AddChipModalComponent', () => {
  let component: AddChipModalComponent;
  let fixture: ComponentFixture<AddChipModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChipModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
