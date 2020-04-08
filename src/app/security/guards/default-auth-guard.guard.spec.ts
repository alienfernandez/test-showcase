import { TestBed } from '@angular/core/testing';

import { DefaultAuthGuardGuard } from './default-auth-guard.guard';

describe('DefaultAuthGuardGuard', () => {
  let guard: DefaultAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DefaultAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
