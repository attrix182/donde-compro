import { TestBed } from '@angular/core/testing';

import { PricesApiService } from './prices-api.service';

describe('PricesApiService', () => {
  let service: PricesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
