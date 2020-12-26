import { TestBed } from '@angular/core/testing';

import { TttapiService } from './tttapi.service';

describe('TttapiService', () => {
  let service: TttapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TttapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
