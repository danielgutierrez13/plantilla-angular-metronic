import { TestBed } from '@angular/core/testing';

import { AmchartsService } from './amcharts.service';

describe('AmchartsService', () => {
  let service: AmchartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmchartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
