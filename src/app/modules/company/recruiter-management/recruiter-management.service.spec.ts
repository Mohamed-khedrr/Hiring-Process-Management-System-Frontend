import { TestBed } from '@angular/core/testing';

import { RecruiterManagementService } from './recruiter-management.service';

describe('RecruiterManagementService', () => {
  let service: RecruiterManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
