import { TestBed } from '@angular/core/testing';

import { ForOnlyLoggedInGuard } from './for-only-logged-in.guard';

describe('ForOnlyLoggedIn.GuardGuard', () => {
  let guard: ForOnlyLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ForOnlyLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
