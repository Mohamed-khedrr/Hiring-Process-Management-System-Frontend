import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { CompanyService } from '../company.service';

export const companyStatisticsResolver: ResolveFn<boolean> = (route, state) => {
  return inject(CompanyService).getCompanyStatistics();
};
