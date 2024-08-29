import { ResolveFn } from '@angular/router';
import { SearchService } from '../../../shared/services/search.service';
import { inject } from '@angular/core';

export const companyFilterResolver: ResolveFn<any> = (route, state) => {
  const searchService = inject(SearchService); 
  const filter = {
    keyword : route.queryParams['keyword'],
    page : 0,
    size : 5
  } 
  return searchService.companySearch(filter); 
};
