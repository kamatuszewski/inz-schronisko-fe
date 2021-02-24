import { TestBed } from '@angular/core/testing';

import { VetsService } from './vets.service';

describe('VetsService', () => {
  let service: VetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
