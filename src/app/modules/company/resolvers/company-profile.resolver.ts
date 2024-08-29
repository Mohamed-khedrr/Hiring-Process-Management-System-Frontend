import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router'; 
import { CompanyService } from '../company.service';

export const companyProfileResolver: ResolveFn<any> = (route, state) => {
  return inject(CompanyService).getAllCompanyData(route.paramMap.get('id'));
};
