import { TestBed } from '@angular/core/testing';

import { QuanlydonService } from './quanlydon.service';

describe('QuanlydonService', () => {
  let service: QuanlydonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanlydonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
