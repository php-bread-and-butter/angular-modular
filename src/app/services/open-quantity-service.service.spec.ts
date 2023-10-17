import { TestBed } from '@angular/core/testing';

import { OpenQuantityServiceService } from './open-quantity-service.service';

describe('OpenQuantityServiceService', () => {
  let service: OpenQuantityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenQuantityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
