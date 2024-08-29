import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { JobPostService } from '../../company/job-posts/job-post.service';

export const jobPostAdvancedResolver: ResolveFn<any> = (route, state) => {
  return inject(JobPostService).getJobPostAdvancedSetting(
    route.paramMap.get('postId')
  );
};
