import type { ResolveFn } from '@angular/router';
import { RetrieveJobSeekerDataService } from '../retrieve-job-seeker-data.service';
import { inject } from '@angular/core';
import { LoaderType } from '../../../shared/enum/loader-type.enum';

export const jobSeekerProfessionalInfoResolver: ResolveFn<boolean> = (
  route,
  state
) => {
  return inject(RetrieveJobSeekerDataService).getProfessionalInfo(
    true,
    LoaderType.jobSeekerProfileLoader
  );
};
