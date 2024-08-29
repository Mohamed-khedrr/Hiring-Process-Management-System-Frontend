import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SearchService } from '../../../shared/services/search.service';

export const searchResolver: ResolveFn<any> = (route, state) => {
  const searchService = inject(SearchService);
  const keyword = route.queryParams['keyword'];
  return searchService.search(keyword) ;
};
