import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
 
export const companyGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const isCompany = tokenService.isCompany();
  const isLoggedIn = tokenService.isLoggedIn();

  if (!isCompany && !isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/auth/login/employer']); 
    return false;
  } else if (!isCompany && isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/not-found']);
    return false;
  }
  return true;
};
