import { TestBed } from '@angular/core/testing';

import { NursuryService } from './nursury.service';

describe('NursuryService', () => {
  let service: NursuryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NursuryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
