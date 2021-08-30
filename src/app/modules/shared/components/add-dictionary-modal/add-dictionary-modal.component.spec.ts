import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDictionaryModalComponent } from './add-dictionary-modal.component';

describe('AddDictionaryModalComponent', () => {
  let component: AddDictionaryModalComponent;
  let fixture: ComponentFixture<AddDictionaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDictionaryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDictionaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
