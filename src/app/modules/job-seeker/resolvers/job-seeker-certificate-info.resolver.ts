import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { RetrieveJobSeekerDataService } from '../retrieve-job-seeker-data.service';
import { LoaderType } from '../../../shared/enum/loader-type.enum';

export const jobSeekerCertificateInfoResolver: ResolveFn<any> = (
  route,
  state
) => {
  return inject(RetrieveJobSeekerDataService).getCertficates(
    true,
    LoaderType.jobSeekerProfileLoader
  );
};
