import { TestBed } from '@angular/core/testing';

import { ShopeeAPIService } from './shopee-api.service';

describe('ShopeeAPIService', () => {
  let service: ShopeeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopeeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
