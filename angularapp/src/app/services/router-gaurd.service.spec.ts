import { TestBed } from '@angular/core/testing';

import { RouterGaurdService } from './router-gaurd.service';

describe('RouterGaurdService', () => {
  let service: RouterGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
