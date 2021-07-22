import { TestBed } from '@angular/core/testing';

import { AnimalListService } from './animal-list.service';

describe('AnimalListService', () => {
  let service: AnimalListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
