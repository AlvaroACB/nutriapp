import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nutricionistaGuard } from './nutricionista.guard';

describe('nutricionistaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nutricionistaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
