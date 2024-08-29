import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SearchService } from '../../../shared/services/search.service';

export const jobsFilterResolver: ResolveFn<any> = (route, state) => {
  const searchService = inject(SearchService); 
  const filter = {
    keyword : route.queryParams['keyword'],
    page : 0,
    size : 5
  } 
  return searchService.jobsSearch(filter); 
};
