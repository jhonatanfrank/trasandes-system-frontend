import { TestBed } from '@angular/core/testing';

import { CarbodiesService } from './carbodies.service';

describe('CarbodiesService', () => {
  let service: CarbodiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbodiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
