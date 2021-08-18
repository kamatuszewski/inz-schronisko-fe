import { TestBed } from '@angular/core/testing';

import { OnlyAllowedRoleGuard } from './only-allowed-role.guard';

describe('OnlyAllowedRoleGuard', () => {
  let guard: OnlyAllowedRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyAllowedRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
