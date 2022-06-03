import { TestBed } from '@angular/core/testing';

import { BitcoinServiceService } from './bitcoin-service.service';

describe('BitcoinServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BitcoinServiceService = TestBed.get(BitcoinServiceService);
    expect(service).toBeTruthy();
  });
});
