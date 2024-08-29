import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
 
export const notAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);  
  const isLoggedIn = tokenService.isLoggedIn();  
  console.log(isLoggedIn)
  if (isLoggedIn) { 
    const router = inject(Router);
    console.log(tokenService.getUserRoles())
    if(tokenService.isCompany()){
      router.navigate(['/company/dashboard-page']);
    }else {
      router.navigate([`/job-seeker/jobs/explore`]);
    }
  }
  return !isLoggedIn;  
};
