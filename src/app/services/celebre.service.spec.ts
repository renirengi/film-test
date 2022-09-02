import { TestBed } from '@angular/core/testing';

import { CelebreService } from './celebre.service';

describe('CelebreService', () => {
  let service: CelebreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelebreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
