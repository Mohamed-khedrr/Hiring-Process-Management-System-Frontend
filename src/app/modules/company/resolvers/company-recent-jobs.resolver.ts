import type { ResolveFn } from '@angular/router'; 
import { inject } from '@angular/core';
import { CompanyService } from '../company.service';

export const companyRecentJobsResolver: ResolveFn<boolean> = (route, state) => {
  return inject(CompanyService).getCompanyJobs();
};
