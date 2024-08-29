import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { JobPostService } from '../../company/job-posts/job-post.service';

export const jobPostAppFormResolver: ResolveFn<any> = (route, state) => {
  return inject(JobPostService).getJobPostApplicationForm(
    route.paramMap.get('postId')
  );
};
