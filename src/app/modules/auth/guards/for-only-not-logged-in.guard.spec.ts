import { TestBed } from '@angular/core/testing';

import { ForOnlyNotLoggedInGuard } from './for-only-not-logged-in.guard';

describe('ForOnlyNotLoggedInGuard', () => {
  let guard: ForOnlyNotLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForOnlyNotLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
