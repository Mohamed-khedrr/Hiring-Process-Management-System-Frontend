import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const jobSeekerGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const isJobSeeker = tokenService.isJobSeeker();
  const isLoggedIn = tokenService.isLoggedIn();

  if (!isJobSeeker && !isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/auth/login/job-seeker']); 
    return false;
  } else if (!isJobSeeker && isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/not-found']);
    return false;
  }
  return true;
};
