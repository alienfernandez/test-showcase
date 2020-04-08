import { TestBed } from '@angular/core/testing';

import { DefaultAuthGuardGuard } from './default-auth-guard.guard';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DefaultAuthGuardGuard', () => {
  let guard: DefaultAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService]
    });
    guard = TestBed.inject(DefaultAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
