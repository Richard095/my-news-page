import { TestBed, async, inject } from '@angular/core/testing';

import { AdminStartRedirectGuard } from './admin-start-redirect.guard';

describe('AdminStartRedirectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminStartRedirectGuard]
    });
  });

  it('should ...', inject([AdminStartRedirectGuard], (guard: AdminStartRedirectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
