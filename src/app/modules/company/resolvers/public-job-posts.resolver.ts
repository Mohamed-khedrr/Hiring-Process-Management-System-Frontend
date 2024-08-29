import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CompanyService } from '../company.service';

export const publicJobPostsResolver: ResolveFn<any> = (route, state) => {
  return inject(CompanyService).getPublicJobPosts(route.paramMap.get('id'));
};
