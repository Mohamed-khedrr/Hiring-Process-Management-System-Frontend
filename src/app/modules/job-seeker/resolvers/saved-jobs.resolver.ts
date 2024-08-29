import { ResolveFn } from '@angular/router';
import { JobPostService } from '../../company/job-posts/job-post.service';
import { inject } from '@angular/core';

export const savedJobsResolver: ResolveFn<any> = (route, state) => {
  return inject(JobPostService).getSavedJobs();
};
