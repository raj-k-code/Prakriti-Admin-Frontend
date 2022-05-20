import { TestBed } from '@angular/core/testing';

import { NurseryGuardService } from './nursery-guard.service';

describe('NurseryGuardService', () => {
  let service: NurseryGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NurseryGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
