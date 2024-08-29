import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { RetrieveJobSeekerDataService } from '../retrieve-job-seeker-data.service';

export const allJobSeekerProfileInfoResolver: ResolveFn<any> = (
  route,
  state
) => {
  return inject(RetrieveJobSeekerDataService).getAllJobSeekerProfileInfo(
    route.params['userId'] as string
  );
};
